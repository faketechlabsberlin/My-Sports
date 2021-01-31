import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { login } from "../actions/session";
import { Link } from 'react-router-dom';
import { clearErrors } from '../actions/error';
import { clearSuccess } from '../actions/success';
import { showPassword } from '../util/helpers/loginPageHelpers';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    clearSuccess: () => dispatch(clearSuccess())
});



const LoginPage = ({ errors, login, clearErrors, clearSuccess }) => {
    useEffect(() => {
        clearErrors();
        clearSuccess();
        return () => {
            clearErrors()
        }
    }, [])

    const loginUser = (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        login(user);
    }

    const [isLoginVisible, setIsLoginVisible] = useState(false);

    const makeLoginVisible = () => {
        setIsLoginVisible(true);
        const backgroundImage = document.getElementById('background-image');
        backgroundImage.classList.remove('basketball-rim-background')
        backgroundImage.classList.add('basketball-rim-background-blurred');
        const header = document.getElementById('header')
        header.classList.remove('header-with-login-not-visible')
        header.classList.add('header-with-login-visible')
    }

    const makeLoginNotVisible = () => {
        setIsLoginVisible(false);
        const backgroundImage = document.getElementById('background-image');
        backgroundImage.classList.remove('basketball-rim-background-blurred');
        backgroundImage.classList.add('basketball-rim-background')
        const header = document.getElementById('header')
        header.classList.remove('header-with-login-visible')
        header.classList.add('header-with-login-not-visible')
    }

    return (

        <div id="background-image" className="login-page basketball-rim-background container-fluid">
            {isLoginVisible ? <i onClick={makeLoginNotVisible} className="material-icons md-36 pointer back-arrow">arrow_back</i>: <div>.</div>}
            <div className="desktop-container">
            <h1 id="header" className="header-with-login-not-visible">MYSPORTS</h1>
            {!isLoginVisible && <div className="row justify-content-center"><button className="login-button col" onClick={makeLoginVisible}>Login</button></div>}
            {isLoginVisible && (
                <div>
                    <form onSubmit={loginUser}>
                        <div className="login-form">
                            <div className="row justify-content-center">
                                <div className="username">
                                    <i className="material-icons md-24">account_circle</i>
                                    <input type="text" id="username" name="username" placeholder="username" required />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                            {errors && <div className="error-box"><div className="row justify-content-center"><p className="text-center"><i className="material-icons md-18 error-symbol">warning</i></p></div><div className="row justify-content-center"><p className="error-text">{errors}</p></div></div>}
                            <div className="password">
                                <i className="material-icons md-24">lock_outline</i>
                                <input type="password" id="password" name="password" placeholder="password" required />
                                <i id="eye" className="material-icons md-24 pointer" onClick={showPassword}>visibility</i>
                            </div>
                        </div>
                            {errors && <div className="row justify-content-center"><p className="text-center"><Link className='forgot-password-button' to="/forgotpassword">Forgot your password?</Link></p></div>}
                            <div>.</div>
                        </div>
                        <div className="row justify-content-center"><button id="login-button">Login</button></div>
                    </form>
                </div>)}
            {!isLoginVisible && (
                <div>
                    <p className="col white-font">New to MySports?</p>
                        <p id="signup-button" className="col"><Link className="signup-button" to="/register">Sign Up</Link></p>
                </div>)}
                </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);