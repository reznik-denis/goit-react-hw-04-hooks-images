import s from './ImageGalleryItem.module.css';
import React from 'react';
import PropTypes from 'prop-types';


export default function ImageGalleryItem({userImageURL, altImage}) {
    return <img src={userImageURL} alt={altImage} className={s.ImageGalleryItemImage} />
}

ImageGalleryItem.propTypes = {
        userImageURL: PropTypes.string.isRequired,
        altImage: PropTypes.string.isRequired
};