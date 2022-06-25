import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    state = {
        allChars: [],
        loading: true,
        error: false,
        newItemLoading: false,  
        offset: 1541,
        charEnded: false
    }

    marvelServices = new MarvelService();

    componentDidMount() {
       this.onRequest();
    }

    onRequest = (offset) => {
        this.marvelServices.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
      }
    
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    
    onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }

        this.setState(({offset, allChars})=>({
                allChars: [...allChars, ...newCharList],
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items = arr.map((item,i) => {
        const image = this.state.allChars[i].availableImage;
        const imageStyle = (image) ? "randomchar__img" : "randomchar__img center"
            return (
                <li 
                    onClick={()=>{this.props.onCharSelected(item.id)}}
                    className="char__item"
                    key={item.id}>
                        <img src={item.thumbnail} alt={item.name} className={imageStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {allChars, loading, error, offset, newItemLoading,charEnded} = this.state;
        const items = this.renderItems(allChars);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={()=> this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;


    