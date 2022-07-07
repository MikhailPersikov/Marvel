import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [allChars, setAllChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading,error,getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ?  setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setAllChars(allChars => [...allChars, ...newCharList]);
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended);
    }

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
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    // const content = !(loading || error) ? items : null;
    // Если оставить так то герои исчезают с страници , только потом подгружаются.

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {/* {content} нужен items */}
            {items}
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


