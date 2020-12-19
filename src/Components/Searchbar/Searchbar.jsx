import {useState} from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar ({onSubmit}) {
    const [search, setSearch] = useState('');
   
    const handleChange = event => {
        setSearch(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        
        event.preventDefault();
        if (search.trim() === '') {
            toast.error("Введите имя картинки!");
            return
        }
        onSubmit(search);
        reset();
    };

    const reset = () => {
        setSearch('');
    };

    return (<header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={s.SearchFormButton}>
                        <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={s.SearchFormInput}
                        type="text"
                        value={search}
                        onChange={handleChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
            );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};