import React from 'react';
import axios from 'axios';

const LoginPage = () => {
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:5000/login', {
            username,
            password
        }).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <h1>MY SPORTS</h1>
            <h4>Login</h4>
            <form action="/login" method="POST">
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

export default LoginPage;