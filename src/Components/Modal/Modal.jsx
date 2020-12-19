import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({onClose, children}) {
    useEffect(() => {
       window.addEventListener('keydown', handleKeydown)
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleKeydown = e => {
        if (e.code === 'Escape') {
            onClose()
        }
    };
    
    function handleOverleyClick(e) {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }

    return createPortal(
        <div className={s.Overlay} onClick={handleOverleyClick}>
            <div className={s.Modal}>
                {children}
            </div>
        </div>, modalRoot,);
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};
