import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage({ errors }) {
    return (
        <div className="container-fluid silver-background">
            <div>.</div>
            <div className="desktop-container">
                <h1 className="header-with-login-visible">MYSPORTS</h1>
                <div className="form-box">
                    <div className="row justify-content-center">
                        <i className="material-icons md-48 error-symbol forgot-password-error">clear</i>
                        <p className="forgot-password-error-message">Oops! {errors}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                <p className="col"><Link className="back-to-login-button" to="/dashboard">Back to Home</Link></p>
                </div>
            </div>
        </div>
    )
}
