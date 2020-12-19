import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    };

    handleKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onClose()
        }
    };
    
    handleOverleyClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    };

    render() {
        return createPortal(
        <div className={s.Overlay} onClick={this.handleOverleyClick}>
            <div className={s.Modal}>
                {this.props.children}
            </div>
        </div>, modalRoot,);
    }
}
