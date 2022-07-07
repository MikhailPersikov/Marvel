import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error,clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
  const _limitCharacters = 'limit=9';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset ) => {
    const res = await request(`${_apiBase}characters?${_limitCharacters}&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const checkLenghtDescription = (desc) => {
    let index;
    let counter = 220;
    if(desc.length <= counter) return desc
    else {
      function checkSpaceInDesc(){
        if(counter > 170) {
          counter--
          if(desc[counter] === ' ') index = counter;
          checkSpaceInDesc();
        }
      }
      checkSpaceInDesc();
    }
    return desc.slice(0,index) + ' ...';
    //Тут можно оптимизировать.
  }

  const checkAvailableImage = (img) => {
    const notAvailable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    if(img === notAvailable ) return false
    else return true;
  }

  const _transformCharacter = (char) => {
    const description = char.description;
    const validDescription  = checkLenghtDescription(description);
    const noDescription = 'There is no description for this character.';
    const image = char.thumbnail.path + '.' + char.thumbnail.extension
    
    return {
      id: char.id,
      name: char.name,
      description: (description) ? validDescription : noDescription ,
      thumbnail: image,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      availableImage: checkAvailableImage(image),
      comics: char.comics.items
    }
  }

  return ({loading, error, getAllCharacters, getCharacter,clearError})
} 

export default useMarvelService;
