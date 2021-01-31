import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { getUserInfo } from '../util/user';
import { receiveErrors, clearErrors } from '../actions/error';
import { connect } from "react-redux";
import ReactTooltip from 'react-tooltip';
import { sendChanges } from '../util/user';
import { clearSuccess } from '../actions/success';
import SuccessPage from '../components/SuccessPage';
import ErrorPage from '../components/ErrorPage';

const mapDispatchToProps = dispatch => ({
    receiveErrors: (payload) => dispatch(receiveErrors(payload)),
    clearErros: () => dispatch(clearErrors()),
    clearSuccess: () => dispatch(clearSuccess())
});

const mapStateToProps = ({ session, errors, success }) => ({
    session,
    errors,
    success
  }); 

const EditProfilePage = ({ match, receiveErrors, clearErrors, session, errors, clearSuccess, success, history }) => {

    const { id } = match.params

    const [userInfo, setUserInfo] = useState({});

    useEffect( async () => {
        const response = await getUserInfo(id)
        if (response.data && response.data !== 'user not found') {
            setUserInfo(response.data)
        } else {
            receiveErrors('You are unauthorized to view this page!')
        }
        return () => {
            clearErrors();
            clearSuccess();
        }
    }, [])

    const editUser = async(e) => {
        e.preventDefault();
        const newInfo = {
            id,
            username: e.target.username.value,
            email: e.target.email.value,
            name: e.target.name.value,
            location: e.target.location.value,
            lastName: e.target.lastName.value,
            gender: e.target.gender.value,
            aboutMe: e.target.aboutMe.value
        }
        const response = await sendChanges(newInfo);
        if (response) {
            history.push('/add-sports/' + id)
        } else {
            receiveErrors('Something went wrong!')
        }
    }

    let isUser = false;
    if (userInfo._id === session.userId) {
      isUser = true;
    }

    if (errors && errors === 'username taken') {
        const input = document.getElementById('username-div-profile-edit');
        input.classList.add('error-border')
    }

    if (errors && errors === 'email taken') {
        const input = document.getElementById('email-div-profile-edit');
        input.classList.add('error-border')
    }

    if (errors || !isUser) {
        return <ErrorPage errors={errors} />
    }

    if (success) {
        return <SuccessPage success={success} />
    }

    if (userInfo.username && isUser) {
        return (
            <div>
                <Header title='EDIT PROFILE' />
                <div className="silver-background container-fluid">
                    <div className="desktop-container">
                        <div>.</div>
                        <div className="form-box-white">
                            <div>.</div>
                            <h3 className="initial-identifier-profile mx-auto">{userInfo.username[0].toUpperCase()}</h3>
                            <p className="registration-message">Edit your information below.</p>
                            <form className="row justify-content-center" onSubmit={editUser}>
                                    <div id="username-div-profile-edit" className="row justify-content-start registration-inputs">
                                        <i className="material-icons md-24 grey-icon">account_circle</i>
                                        <input className="registration-username" type="text" defaultValue={userInfo.username} id="username" name="username" placeholder="Username" pattern="[A-Za-z0-9]+" data-tip="Only letters and numbers may be used." required />
                                        <ReactTooltip place="top" type="light" effect="solid" border={true} borderColor="black"/>
                                    </div>
                                    {errors && <p className="error-text">The username or email might already be taken. Please try again.</p> }
                                    <div id="email-div-profile-edit" className="row justify-content-center registration-inputs">
                                        <input type="email" defaultValue={userInfo.email} id="email" name="email" placeholder="Email" required />
                                    </div>
                                    {errors && <p className="error-text">The username or email might already be taken. Please try again.</p> }
                                <div className="row justify-content-center registration-inputs">
                                    <input type="text" id="name" defaultValue={userInfo.name} name="name" placeholder="First Name" pattern="[A-Za-z]+" required />
                                </div>
                                <div className="row justify-content-center registration-inputs">
                                    <input type="text" id="lastName" defaultValue={userInfo.lastName} name="lastName" placeholder="Last Name" pattern="[A-Za-z]+" required />
                                </div>
                                <div className="row justify-content-center">
                                    <select id="gender" defaultValue={userInfo.gender} name="gender" className="reg-select" required>
                                        <option value="">--Please choose a Gender--</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="N/A">Prefer Not To Say</option>
                                    </select>
                                </div>
                                <div className="row justify-content-center">
                                    <select id="location" name="location" defaultValue={userInfo.location} className="reg-select" required>
                                        <option value="">--Please choose a Location--</option>
                                        <option value="Charlottenburg">Charlottenburg</option>
                                        <option value="Friedrichshain">Friedrichshain</option>
                                        <option value="Kreuzberg">Kreuzberg</option>
                                        <option value="Mitte">Mitte</option>
                                        <option value="Moabit">Moabit</option>
                                        <option value="Neukolln">Neukolln</option>
                                        <option value="Prenzlauer Berg">PrenzLauer Berg</option>
                                        <option value="Schoneberg">Schoneberg</option>
                                        <option value="Tempelhof">Tempelhof</option>
                                        <option value="Tiergarten">Tiergarten</option>
                                        <option value="Wilmersdorf">Wilmersdorf</option>
                                    </select>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <textarea maxLength="150" cols="25" id="aboutMe" name="aboutMe" defaultValue={userInfo.aboutMe} placeholder="About Me"></textarea>
                                </div>
                                <button className="add-fav-sports-button pt-2 pb-2">Add Fav Sports</button>
                            </form>
                        <div className="profile-box-bottom-space"></div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfilePage);