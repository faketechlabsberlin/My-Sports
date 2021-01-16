import React from 'react';
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
    return (
        <div id="loginPage">
            <h1>MY SPORTS</h1>
            <h4>Login</h4>
            <form onSubmit={loginUser}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="password" required />
                </div>
                {errors && <p>{errors}</p>}
                <button>Login</button>
            </form>
            <p>Don't have an account?</p>
            <p><Link to="/register">Register here</Link></p>
            <p><Link to="/forgotpassword">Forgot your password?</Link></p>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);