import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { toggleCodeOk, getUsername, updateSuccessToggle } from '../actions/resetPassword';
import axios from 'axios';

const mapDispatchToProps = dispatch => ({
    toggleCodeOk: () => dispatch(toggleCodeOk()),
    updateSuccessToggle: () => dispatch(updateSuccessToggle()),
    getUsername: (payload) => dispatch(getUsername(payload))
});

const mapStateToProps = ({ resetPassword }) => ({
    resetPassword
})

const PasswordResetPage = ({ match, getUsername, toggleCodeOk, resetPassword, updateSuccessToggle, history }) => {
    useEffect(async() => {
        const { code } = match.params;
        await axios
            .get(`/api/users/reset/` + code,)
            .then((response) => {
                getUsername(response.data);
                toggleCodeOk();
            })
      }, [])

    const updatePassword = async(e) => {
        e.preventDefault();
        await axios
        .put('/api/users/updatepassword/', {
            username: resetPassword.username,
            password: e.target.password.value
        })
        .then((response) => {
            console.log(response)
            if (response.data.message === 'password updated') {
                updateSuccessToggle();
                history.push('/login')
            }
        })
    }

    return (
        <div>
            <h2>Password Reset Page</h2>
            <form onSubmit={updatePassword}>
            <label htmlFor="password">Please enter new password(8 characters minimum, 12 characters maximum. Must contain atleast 1 letter and 1 number):</label>
            <input type="password" name="password" id="password" placeholder="password" minLength="8" maxLength="12" pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}" required ></input>
            </form>
        </div>
    )
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PasswordResetPage);