import React from 'react';
import Loader from "react-loader-spinner";
import s from './Loader.module.css';

export default function LoaderSpinner (props) {
    return (<Loader
        className={s.loaderSpinner}
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
    />);
}

