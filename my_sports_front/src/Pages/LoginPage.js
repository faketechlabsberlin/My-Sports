import React, { useState } from 'react';
import { connect } from "react-redux";
import { login } from "../actions/session";
import { Link } from 'react-router-dom';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});



const LoginPage = ({ errors, login }) => {
    const loginUser = (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        login(user);
    }

    const [isLoginVisible, setIsLoginVisible] = useState(false);

    return (

        <div id="background-image" className="login-page container-fluid">
            {isLoginVisible ? <div className="row"><div className="login-page-top-space-true col"><i onClick={() => setIsLoginVisible(false)} className="material-icons md-36 pointer">arrow_back</i></div></div> : <div className="row"><div className="login-page-top-space-false col"></div></div>}
            <h1>MYSPORTS</h1>
            {!isLoginVisible ? <div className="row justify-content-center"><button className="login-button col" onClick={() => setIsLoginVisible(true)}>Login</button></div> : null}
            {isLoginVisible ? (
                <div>
                    <form onSubmit={loginUser}>
                        <div className="login-form">
                            <div>
                                <label htmlFor="username"><i className="material-icons md-36">account_circle</i></label>
                                <input type="text" id="username" name="username" placeholder="username" required />
                            </div>
                            {errors && <p>{errors}</p>}
                            <div>
                                <label htmlFor="password"><i className="material-icons md-36">lock_outline</i></label>
                                <input type="password" id="password" name="password" placeholder="password" required />
                            </div>
                            {errors && <p><Link to="/forgotpassword">Forgot your password?</Link></p>}
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            ) : null}
            {!isLoginVisible ? (
                <div>
                    <div className="row justify-content-center">
                        <p className="col white-font">New to MySports?</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="col"><Link class="signup-button" to="/register">Sign Up</Link></p>
                    </div>
                </div>
            ) : null}

        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);