import {Component} from 'react';
import Spinner from '../spinner/Spinner'
import MarvelService from '../../services/MarvelServices'

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

class RandomChar extends Component {
  constructor(props){
      super(props);
      this.updateChar();
  }
  //Почему метод вызывается в конструкторе ? Что такое конструктор ? 
  state = {
   char: {},
   loading: true,
  }

  marvelServices = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({char})
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 -1011000) + 1011000);
    console.log(id);
    this.marvelServices
      .getCharacter(id)
      .then(this.onCharLoaded)
    }
//Можно просто прикрутить к асинку then на похуях? 
    //   .then(res => {
    //     this.setState(res)
    //   })
    //В стейте нельзя использовать методы ? 
    render(){
    const {char: {name, description, thumbnail, homepage, wiki}, loading} = this.state;
    
    if(loading) {
        return <Spinner/>
    }
    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
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
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
  } 
}

export default RandomChar;