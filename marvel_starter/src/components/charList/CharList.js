import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [allChars, setAllChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelServices = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelServices.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }


        // this.setState(({ offset, allChars }) => ({
        //     allChars: [...allChars, ...newCharList],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 9,
        //     charEnded: ended
        // }))

        setAllChars(allChars => [...allChars, ...newCharList]);
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended);
    }

    const onError = () => {
        setError(true);
        setLoading(loading => false);
    }

    // const itemsRefs = useRef([]);

    // const focusOnItem = (id) => {
    //     itemsRefs.current.forEach(item => item.CharList.remove('char__item_selected'))
    //     itemsRefs.current[id].classList.add('char__item_selected');
    //     itemsRefs.current[id].focus();
    // }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const image = allChars[i].availableImage;
            const imageStyle = (image) ? "randomchar__img" : "randomchar__img center"
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    key={item.id}
                    // ref={el => itemsRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        // focusOnItem(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} className={imageStyle} />
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

    const items = renderItems(allChars);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;


