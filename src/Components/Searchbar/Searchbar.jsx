import React, {Component} from 'react';
import s from './Searchbar.module.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
    state = {
        search: '',
    }

    handleChange = event => {
        this.setState({ search: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        
        event.preventDefault();
        if (this.state.search.trim() === '') {
            toast.error("Введите имя картинки!");
            return
        }
        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({ search: '' })
    };

    render() {
        return (<header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={s.SearchFormButton}>
                        <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={s.SearchFormInput}
                        type="text"
                        value={this.state.search}
                        onChange={this.handleChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
            );
    };
}