import React from 'react';
import s from './LoadMore.module.css';
import PropTypes from 'prop-types';

export default function LoadMore({onClick}) {
    return (
        <button type='button' className={s.Button} onClick={() => onClick()}>Load more</button>
    )
}

LoadMore.propTypes = {
    onClick: PropTypes.func.isRequired,
};