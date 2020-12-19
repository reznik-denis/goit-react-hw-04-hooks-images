import React from 'react';
import s from './DefaultNotifeImages.module.css';
import upps from './upps.jpg';

export default function DefaultNotifeImages({imageURL = upps}) {
    return <div><img className={s.imageClass} src={imageURL} alt="upps" width="400"/>  
        <div className={s.defaultNotifeImages}>Картинки с таким именем отсутствуют</div>
    </div>
}