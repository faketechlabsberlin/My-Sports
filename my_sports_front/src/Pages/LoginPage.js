import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { login } from "../actions/session";

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});
  

const LoginPage = ({ errors, login }) => {
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        login(user);
    }
    return (
        <div>
            <h1>MY SPORTS</h1>
            <h4>Login</h4>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="username" ref={usernameRef} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="password" ref={passwordRef} required />
                </div>
                <button onClick={loginUser}>Login</button>
            </form>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage);