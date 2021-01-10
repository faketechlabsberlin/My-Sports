import React from 'react';
import { connect } from "react-redux";
import { signup } from "../actions/session";

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user))
});


const RegisterPage = ({ errors, signup }) => {   
    
    const registerUser = (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            name: e.target.name.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
            location: e.target.location.value,
            lastName: e.target.lastName.value
        }
        signup(user);
    }

    return (
        <div>
        <h1>MY SPORTS</h1>
        <h4>Register</h4>
        <form onSubmit={registerUser}>
            <div>
                <label htmlFor="username">Username (only letters and number inputs accepted):</label>
                <input type="text" id="username" name="username" placeholder="username" pattern="[A-Za-z0-9]+" required />           
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="email" required />
            </div>
            <div>
                <label htmlFor="password">Password (8 characters minimum, 12 characters maximum. Must contain atleast 1 letter and 1 number):</label>
                <input type="password" id="password" name="password" placeholder="password" minLength="8" pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}" required />
            </div>
            <div>
                <label htmlFor="name">First Name:</label>
                <input type="text" id="name" name="name" placeholder="name" pattern="[A-Za-z]+" required />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" placeholder="lastName" pattern="[A-Za-z]+" required />
            </div>
            <div>
                <label htmlFor="dob">Date Of Birth:</label>
                <input type="date" id="dob" name="dob" min="1920-01-01" required />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="">--Please choose an option--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="N/A">Prefer Not To Say</option>
                </select>
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <select id="location" name="location" required>
                    <option value="">--Please choose an option--</option>
                    <option value="berlin">Berlin</option>
                </select>
            </div>
            <button>Register Now</button>
        </form>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterPage);