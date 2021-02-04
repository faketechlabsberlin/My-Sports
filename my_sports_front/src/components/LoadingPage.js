import React from 'react';
import loading from '../images/loading.gif';

export default function LoadingPage() {
    return (
        <div className="row justify-content-center align-items-center loading-container">
            <div className="col-5"></div>
            <img className="col-2" src={loading}></img>
            <div className="col-5"></div>
        </div>
    )
}
