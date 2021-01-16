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

        <div>
            {isLoginVisible? <div className="login-page-top-space-true"><i onClick={() => setIsLoginVisible(false)} className="material-icons md-36 pointer">arrow_back</i></div>: <div className="login-page-top-space-false"></div>}
            <h1>MY SPORTS</h1>
            {!isLoginVisible ? <button onClick={() => setIsLoginVisible(true)}>Login</button>: null}
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
                    <p>New to MySports?</p>
                    <p><Link to="/register"><button>Sign Up</button></Link></p>
                </div>
            ) : null}
            
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);