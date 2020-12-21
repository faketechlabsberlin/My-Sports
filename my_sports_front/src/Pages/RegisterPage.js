import React from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const usernameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const nameRef = React.createRef();
    const dobRef = React.createRef();
    const genderRef = React.createRef();
    const locationRef = React.createRef();

    const registerUser = () => {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;
        const dob = dobRef.current.value;
        const gender = genderRef.current.value;
        const location = locationRef.current.value;

        axios.post('http://localhost:5000/register', {
            username,
            email,
            password,
            name,
            dob,
            gender,
            location
        })
    }
    return (
        <div>
        <h1>MY SPORTS</h1>
        <h4>Register</h4>
        <form action="/register" method="POST">
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="username" ref={usernameRef} required />           
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="email" ref={emailRef} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="password" ref={passwordRef} required />
            </div>
            <div>
                <label htmlFor="name">First Name:</label>
                <input type="text" id="name" name="name" placeholder="name" ref={nameRef} required />
            </div>
            <div>
                <label htmlFor="dob">Date Of Birth:</label>
                <input type="date" id="dob" name="dob" min="1920-01-01" ref={dobRef} required />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" ref={genderRef} required>
                    <option value="">--Please choose an option--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="N/A">Prefer Not To Say</option>
                </select>
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <select id="location" name="location" ref={locationRef} required>
                    <option value="">--Please choose an option--</option>
                    <option value="berlin">Berlin</option>
                </select>
            </div>
            <button onClick={registerUser}>Register Now</button>
        </form>
        </div>
    )
}

export default RegisterPage;