import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { toggleCodeOk, getUsername, updateSuccessToggle } from '../actions/resetPassword';
import { receiveErrors } from '../actions/error';
import axios from 'axios';

const mapDispatchToProps = dispatch => ({
    toggleCodeOk: () => dispatch(toggleCodeOk()),
    updateSuccessToggle: () => dispatch(updateSuccessToggle()),
    getUsername: (payload) => dispatch(getUsername(payload)),
    receiveErrors: (payload) => dispatch(receiveErrors(payload))
});

const mapStateToProps = ({ resetPassword, errors }) => ({
    resetPassword,
    errors
})

const PasswordResetPage = ({ match, getUsername, toggleCodeOk, resetPassword, updateSuccessToggle, history, receiveErrors, errors }) => {
    useEffect(async() => {
        const { code } = match.params;
        await axios
            .get(`/api/users/reset/` + code,)
            .then((response) => {
                getUsername(response.data);
                toggleCodeOk();
            })
            .catch((error) => {
                receiveErrors(error.response.data.message)
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
            if (response.data.message === 'password updated') {
                updateSuccessToggle();
                history.push('/login')
            }
        })
        .catch((error) => {
            receiveErrors(error.response.data.message);
        })
    }

    if (errors) {
        return (
            <div>
                <h4>Oops! {errors}</h4>
            </div>
        )
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