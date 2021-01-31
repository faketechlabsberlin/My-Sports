import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div className="container-fluid basketball-rim-background-blurred">
            <div>.</div>
            <div className="desktop-container">
                <h1 className="header-with-login-visible">MYSPORTS</h1>
                <div className="form-box">
                    <div className="row justify-content-center">
                        <i className="material-icons md-48 error-symbol forgot-password-error">clear</i>
                        <p className="forgot-password-error-message">Oops! 404: This page was not found!</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <p className="col"><Link className="back-to-login-button" to="/login">Back to login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;