import React from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ pictures, onClick }) {
    return (<ul className={s.ImageGallery}>
        {pictures && pictures.map(({ webformatURL, largeImageURL, tags }, index) => (<li key={index} className={s.ImageGalleryItem} onClick={() => onClick(largeImageURL, tags)}>
            <ImageGalleryItem userImageURL={webformatURL} altImage={tags}/>
            </li>
            )) 
        }
        </ul>);    
};

ImageGallery.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }))
};
