import {Component} from 'react';
import MarvelService from '../../services/MarvelServices';

import abyss from '../../resources/img/abyss.jpg';
import './charList.scss';

class CharList extends Component {
    state = {
        allChars:{}
    }

    marvelServices = new MarvelService();

    componentDidMount() {
        this.updateAllChar();
        console.log('mount')
        console.log(this.state.allChars)
      }

    //Если запускать без компонент Дид моунт то стейт будет загружатся бесконечно. 

    onAllCharsLoader = (allChars) => {
        this.setState({allChars})
    }

    updateAllChar = () => {
        this.marvelServices.getAllCharacters().then(this.onAllCharsLoader)
    }

    render() {
        const content = <View char={this.state.char}/>
        return (
            <div className="char__list">
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
 
}

const View = ({char}) => {
    console.log(char)
    return (
        <ul className="char__grid">
        <li className="char__item">
            <img src={abyss} alt="abyss"/>
            <div className="char__name">Abyss</div>
        </li>
    </ul>
    )
}

export default CharList;