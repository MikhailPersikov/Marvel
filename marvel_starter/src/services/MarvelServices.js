class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';

  getResource =  async url => {
    let res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
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

  _transformCharacter = (res) => {
    const description = res.data.results[0].description;
    const validDescription  = this.checkLenghtDescription(description);
    const noDescription = 'There is no description for this character.';

    return {
      name: res.data.results[0].name,
            description: (description) ? validDescription : noDescription ,
            thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
            homepage: res.data.results[0].urls[0].url,
            wiki: res.data.results[0].urls[1].url
    }
  }

} 

export default MarvelService;
