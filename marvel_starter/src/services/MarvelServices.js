class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
  _limitCharacters = 'limit=9';

  getResource =  async url => {
    let res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?${this._limitCharacters}&offset=210&${this._apiKey}`);
    const allChars = res.data.results
    const arrWithAllChars = []; 
    allChars.forEach(char => {
      arrWithAllChars.push(this._transformAllCharacter(char))
    })
    return arrWithAllChars;
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res);
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

  _transformCharacter = (res) => {
    const description = res.data.results[0].description;
    const validDescription  = this.checkLenghtDescription(description);
    const noDescription = 'There is no description for this character.';
    const image = res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension
    
    return {
      name: res.data.results[0].name,
            description: (description) ? validDescription : noDescription ,
            thumbnail: image,
            homepage: res.data.results[0].urls[0].url,
            wiki: res.data.results[0].urls[1].url,
            availableImage: this.checkAvailableImage(image),
    }
  }

  _transformAllCharacter = (res) => {
    const description = res.description;
    const validDescription  = this.checkLenghtDescription(description);
    const noDescription = 'There is no description for this character.';
    const image = res.thumbnail.path + '.' + res.thumbnail.extension;

    return {
      name: res.name,
            description: (description) ? validDescription : noDescription ,
            thumbnail: image,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            availableImage: this.checkAvailableImage(image),
    }
  }
} 

export default MarvelService;
