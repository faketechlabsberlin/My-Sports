import React from 'react';
import axios from 'axios'; //maybe implement
import { connect } from "react-redux";
import { signup } from "../actions/session";

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user))
});


const RegisterPage = ({ errors, signup }) => {   
    const usernameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const nameRef = React.createRef();
    const dobRef = React.createRef();
    const genderRef = React.createRef();
    const locationRef = React.createRef();

    const registerUser = (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            dob: dobRef.current.value,
            gender: genderRef.current.value,
            location: locationRef.current.value
        }
        signup(user);
    }

    return (
        <div>
        <h1>MY SPORTS</h1>
        <h4>Register</h4>
        <form>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterPage);