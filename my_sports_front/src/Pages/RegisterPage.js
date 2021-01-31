import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { signup } from "../actions/session";
import MySportsModal from "../components/MySportsModal";
import '../styles/common.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { clearErrors } from '../actions/error';
import { showPassword } from '../util/helpers/loginPageHelpers';
import TermsAndConditions from '../components/TermsAndConditions';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
});

const RegisterPage = ({ errors, signup, clearErrors }) => {

    useEffect(() => {
        return () => {
            clearErrors()
        }
    }, [])

    const registerUser = async(e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            name: e.target.name.value,
            dob: moment.parseZone(e.target.dob.value),
            lastName: e.target.lastName.value
        }
        signup(user);
    }

    const [startDate, setStartDate] = useState(null);
    const [isTermsVisible, setIsTermsVisible] = useState(false);

    const showTerms = () => {
        setIsTermsVisible(true);
        const body = document.querySelector('.container-fluid');
        body.classList.add('modal-scroll-block');
    }

    const hideTerms = () => {
        setIsTermsVisible(false);
        const body = document.querySelector('.container-fluid');
        body.classList.remove('modal-scroll-block');
    }

    if (errors && errors === 'username taken') {
        const input = document.getElementById('username-div');
        input.classList.add('error-border')
    }

    if (errors && errors === 'email taken') {
        const input = document.getElementById('email-div');
        input.classList.add('error-border')
    }

    return (
        <div className="silver-background container-fluid">
            <div className="desktop-container">
                <div>.</div>
                <div className="form-box-white">
                    <p className="registration-message">Sign up to find sport matches with people in your area.</p>
                    <form className="row justify-content-center" onSubmit={registerUser}>  
                        <div id="username-div" className="row justify-content-start registration-inputs">
                            <i className="material-icons md-24 grey-icon">account_circle</i>
                            <input className="registration-username" type="text" id="username" name="username" placeholder="Username" pattern="[A-Za-z0-9]+" data-tip="Only letters and numbers may be used." required />
                            <ReactTooltip place="top" type="light" effect="solid" border={true} borderColor="black"/>
                        </div>
                        {errors && errors === 'username taken' && <p className="error-text">This username is already taken. Try another one.</p>}
                        <div id="email-div" className="row justify-content-center registration-inputs">
                            <input type="email" id="email" name="email" placeholder="Email" required />
                        </div>
                        {errors && errors === 'email taken' && <p className="error-text">This email address is already registered. Try another one.</p>}
                        <div className="row justify-content-between registration-inputs">
                            <i className="material-icons md-24 grey-icon">lock_outline</i>
                            <input type="password" id="password" name="password" placeholder="Password" minLength="8" pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}" data-tip="Passwords must be between 8 and 12 characters long. They must containt atleast 1 letter and 1 number." required />
                            <ReactTooltip place="top" type="light" effect="solid" border={true} borderColor="black"/>
                            <i id="eye" className="material-icons md-24 grey-icon" onClick={showPassword}>visibility</i>
                        </div>
                        <div className="row justify-content-center registration-inputs">
                            <input type="text" id="name" name="name" placeholder="First Name" pattern="[A-Za-z]+" required />
                        </div>
                        <div className="row justify-content-center registration-inputs">                
                            <input type="text" id="lastName" name="lastName" placeholder="Last Name" pattern="[A-Za-z]+" required />
                        </div>
                        <div className="row justify-content-center registration-inputs">
                            <DatePicker
                                id="dob"
                                name="dob"
                                placeholderText="Date Of Birth"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                startDate={moment().subtract(18, 'years')._d}
                                maxDate={moment().subtract(18, 'years')._d}
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                scrollableYearDropdown
                                showMonthDropdown
                                scrollableMonthDropdown
                                yearDropdownItemNumber={100}
                            />
                        </div>
                        <div className="row justify-content-center">
                            <button className="send-registration-button">Sign Up</button>
                        </div>
                        <div className="Terms">
                            <p className="registration-message">By signing up, you agree to our <span onClick={showTerms} className="pointer"><strong>Terms, Data Policy</strong> and <strong>Cookies Policy.</strong></span></p>
                            <MySportsModal onClose={hideTerms} isTermsVisible={isTermsVisible}>
                                <TermsAndConditions />
                            </MySportsModal>
                        </div>
                    </form>
                </div>
                <div className="row justify-content-center">
                    <Link className="back-to-login-button" to="/login">Back to login</Link>
                </div>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);