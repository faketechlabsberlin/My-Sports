import React from 'react';
import Modal from 'react-modal'

const TermsConditions = ({ id = "modal", onClose = () => { }, children, isTermsVisible }) => {

    const handleOutSideClick = (e) => {
        if (e.target.id == id) onClose();
    }

    return (
        <Modal isOpen={isTermsVisible}>
            <div id={id} className="modal" onClick={handleOutSideClick} >
                <div className="modal-container">
                    <div className="justify-content-end row">
                        <button className="close-modal" onClick={onClose}>X</button>
                    </div>
                    <div className="content">{children}</div>
                </div>
            </div>
        </Modal>
    );
};

export default TermsConditions;