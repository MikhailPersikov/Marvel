class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
  _limitCharacters = 'limit=9';
  _baseOffset = 210;

  getResource =  async url => {
    let res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = async (offset = this._baseOffset ) => {
    const res = await this.getResource(`${this._apiBase}characters?${this._limitCharacters}&offset=210&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  checkLenghtDescription = (desc) => {
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

  checkAvailableImage = (img) => {
    const notAvailable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    if(img === notAvailable ) return false
    else return true;
  }

  _transformCharacter = (char) => {
    const description = char.description;
    const validDescription  = this.checkLenghtDescription(description);
    const noDescription = 'There is no description for this character.';
    const image = char.thumbnail.path + '.' + char.thumbnail.extension
    
    return {
      id: char.id,
      name: char.name,
      description: (description) ? validDescription : noDescription ,
      thumbnail: image,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      availableImage: this.checkAvailableImage(image),
      comics: char.comics.items
    }
  }

} 

export default MarvelService;
