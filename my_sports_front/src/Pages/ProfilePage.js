import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import { getUserInfo } from '../util/user';
import StarRatings from 'react-star-ratings';
import { connect } from "react-redux";
import { clearErrors, receiveErrors } from '../actions/error';
import DesktopSideBar from '../components/DesktopSideBar'

const mapDispatchToProps = dispatch => ({
    receiveErrors: (payload) => dispatch(receiveErrors(payload)),
    clearErros: () => dispatch(clearErrors())
});

const mapStateToProps = ({ session, errors }) => ({
    session,
    errors
  });  

const ProfilePage = ({ match, session, clearErrors, receiveErrors, errors }) => {
    const { id } = match.params

    const [userInfo, setUserInfo] = useState({});
    const [firstSportRating, setFirstSportRating] = useState(0);
    const [secondSportRating, setSecondSportRating] = useState(0);
    const [thirdSportRating, setThirdSportRating] = useState(0);
    const [firstSport, setFirstSport] = useState('');
    const [secondSport, setSecondSport] = useState('');
    const [thirdSport, setThirdSport] = useState('');

    useEffect( async () => {
        const response = await getUserInfo(id)
        if (response.data && response.data !== 'user not found') {
            setUserInfo(response.data)

            const sportRatings = {
                volleyball: response.data.volleyballRating,
                basketball: response.data.basketballRating,
                football: response.data.footballRating,
                bouldering: response.data.boulderingRating,
                yoga: response.data.yogaRating,
                pingpong: response.data.pingpongRating,
                running: response.data.runningRating
            }
        
            const ratingPicker = Object.keys(sportRatings).map(function(key) {
                return { key: key, value: this[key] };
            }, sportRatings);
            ratingPicker.sort(function(p1, p2) { return p2.value - p1.value; });
            const topThree = ratingPicker.slice(0, 3);

            setFirstSportRating(topThree[0].value)
            setSecondSportRating(topThree[1].value)
            setThirdSportRating(topThree[2].value)
            setFirstSport(topThree[0].key)
            setSecondSport(topThree[1].key)
            setThirdSport(topThree[2].key)
        } else {
            receiveErrors('User not found!')
        }
        return () => {
            clearErrors();
        }
    }, [])

    let isUser = false;
    if (userInfo._id === session.userId) {
      isUser = true;
    }

    const ageDifMs = Date.now() - Date.parse(userInfo.dob)
    const ageDate = new Date(ageDifMs)
    const age = Math.abs(ageDate.getUTCFullYear() - 1970)

    if (errors) {
        return (
            <div className="container-fluid silver-background">
                <h1 className="forgot-password-header">MYSPORTS</h1>
                <div className="form-box">
                    <i className="material-icons md-48 error-symbol forgot-password-error">clear</i>
                    <p className="forgot-password-error-message">Oops! {errors}</p>
                </div>
                <div className="row justify-content-center">
                <p className="col"><Link className="back-to-login-button" to="/dashboard">Back to Dashboard</Link></p>
                </div>
            </div>
        )
    }

    if (userInfo.username) {
        return (
            <div>
                <Header title='YOUR PROFILE' />
                <div className="silver-background container-fluid row m-0 p-0">
                    <div className="desktop-sidebar col-3"><DesktopSideBar /></div>
                        <div className="desktop-small-container">
                            <div>.</div>
                            <div className="form-box-white">
                                <div>.</div>
                                <h3 className="initial-identifier-profile mx-auto">{userInfo.username[0].toUpperCase()}</h3>
                                <h3 className="username-profile pb-4">{userInfo.username.toUpperCase()}</h3>
                                <div className="row justify-content-between user-info-section pt-4 ml-4 mr-4">
                                    <div className="col">
                                        <p className="profile-query">Age:</p>
                                        <p className="blue-icon">{age || <span>N/A</span>}</p> 
                                    </div>
                                    <div className="col row justify-content-end">
                                        <p className="profile-favsports-title">My Top Sports</p>
                                        <img className="favsport" src={`../images/sport-images/${firstSport}.png`} />
                                        <StarRatings
                                            rating={firstSportRating}
                                            starRatedColor="#E9B467"
                                            numberOfStars={5}
                                            starDimension="1.2em"
                                            starSpacing="0.7px"
                                            className="profile-display-stars"
                                            />
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col ml-4">
                                        <p className="profile-query">Gender:</p>
                                        <p className="blue-icon">{userInfo.gender || <span>N/A</span>}</p>  
                                    </div>
                                    <div className="col mr-4 row justify-content-end">
                                        <img className="favsport" src={`../images/sport-images/${secondSport}.png`}/>
                                        <StarRatings
                                            rating={secondSportRating}
                                            starRatedColor="#E9B467"
                                            numberOfStars={5}
                                            starDimension="1.2em"
                                            starSpacing="0.7px"
                                            className="profile-display-stars"
                                            />
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col ml-4">
                                        <p className="profile-query">Lives in:</p>
                                        <p className="blue-icon">{userInfo.location || <span>N/A</span>}</p>  
                                    </div>
                                    <div className="col mr-4 row justify-content-end">
                                        <img className="favsport" src={`../images/sport-images/${thirdSport}.png`}/>
                                        <StarRatings
                                            rating={thirdSportRating}
                                            starRatedColor="#E9B467"
                                            numberOfStars={5}
                                            starDimension="1.2em"
                                            starSpacing="0.7px"
                                            className="profile-display-stars"
                                            />
                                    </div>
                                </div>
                                <p className="profile-query ml-4">About me:</p>
                                <p className="ml-4 mr-4 blue-icon">{userInfo.aboutMe || <span>N/A</span>}</p>
                                {isUser && <div className="row justify-content-center"><Link to={"/edit-profile/" + userInfo._id} className="col-8 col-md-4 pt-3 pb-1 mt-4 profile-edit-button"><h3 className="pointer profile-edit-button">EDIT INFO</h3></Link></div>}
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
  )(ProfilePage);