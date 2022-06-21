import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelServices'

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

class RandomChar extends Component {
 
//  Что такое конструктор ? 
  state = {
   char: {},
   loading: true,
   error: false,
  }

  marvelServices = new MarvelService();

  componentDidMount() {
    this.updateChar();
    this.componentWillUnmount();
  }

  componentWillUnmount() {
    this.setState({
        char: {},
        loading: true,
        error: false,
    })
  }

  onCharLoaded = (char) => {
    this.setState({char,loading: false})
  }

  onError = () => {
    this.setState({
        loading: false,
        error: true,
    })
  }

  onUpdateChar = () => {
   this.componentDidMount()
  }

  updateChar = () => {
      const id = Math.floor(Math.random() * (1011400 -1011000) + 1011000);
      this.marvelServices
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError)
    }
    
    // updateAllChars = () => {
    //     this.marvelServices
    //     .getAllCharacters().then(res => console.log(res))
    // }

    render(){
    const {char, loading, error} = this.state;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    
    return (
        <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner"
                    onClick={this.onUpdateChar}
                    >try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
} 
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const image = char.availableImage;
    const className = (image) ? "randomchar__img" : "randomchar__img center"
  
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={className}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                 {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default RandomChar;
