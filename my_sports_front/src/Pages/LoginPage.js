import React from 'react';
import axios from 'axios'; //maybe implement
import { connect } from "react-redux";
import { login } from "../actions/session";

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
    return (
        <div>
            <h1>MY SPORTS</h1>
            <h4>Login</h4>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="password" required />
                </div>
                <button onClick={loginUser}>Login</button>
            </form>
            <p>Don't have an account?</p>
            <p><a href="/register">Register here</a></p>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage);