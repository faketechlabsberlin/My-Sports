import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { getUserInfo } from '../util/user';
import { receiveErrors, clearErrors } from '../actions/error';
import { connect } from "react-redux";
import StarRatings from 'react-star-ratings';
import { clearSuccess, receiveSuccess } from '../actions/success';
import SuccessPage from '../components/SuccessPage';
import ErrorPage from '../components/ErrorPage';
import basketball from '../images/sport-images/basketball.png';
import bouldering from '../images/sport-images/bouldering.png';
import football from '../images/sport-images/football.png';
import pingpong from '../images/sport-images/pingpong.png';
import running from '../images/sport-images/running.png';
import volleyball from '../images/sport-images/volleyball.png';
import yoga from '../images/sport-images/yoga.png';
import { updateRatings } from '../util/user';
import Modal from "../components/MySportsModal";
import GeneralSportsGuidance from '../components/GeneralSportsGuidance';
import MySportsModal from "../components/MySportsModal";
import BoulderingGuidance from '../components/BoulderingGuidance';
import YogaGuidance from '../components/YogaGuidance';
import RunningGuidance from '../components/RunningGuidance';



const mapDispatchToProps = dispatch => ({
    receiveErrors: (payload) => dispatch(receiveErrors(payload)),
    receiveSuccess: (payload) => dispatch(receiveSuccess(payload)),
    clearErros: () => dispatch(clearErrors()),
    clearSuccess: () => dispatch(clearSuccess())
});

const mapStateToProps = ({ session, errors, success }) => ({
    session,
    errors,
    success
  }); 

const EditProfilePage = ({ match, receiveErrors, clearErrors, session, errors, receiveSuccess, clearSuccess, success }) => {

    const { id } = match.params

    const [userInfo, setUserInfo] = useState({});
    const [volleyballRating, setVolleyballRating] = useState(0);
    const [basketballRating, setBasketballRating] = useState(0);
    const [footballRating, setFootballRating] = useState(0);
    const [boulderingRating, setBoulderingRating] = useState(0);
    const [yogaRating, setYogaRating] = useState(0);
    const [pingpongRating, setPingpongRating] = useState(0);
    const [runningRating, setRunningRating] = useState(0);

    useEffect( async () => {
        const response = await getUserInfo(id)
        if (response.data && response.data !== 'user not found') {
            setUserInfo(response.data)
            setVolleyballRating(response.data.volleyballRating)
            setBasketballRating(response.data.basketballRating)
            setFootballRating(response.data.footballRating)
            setBoulderingRating(response.data.boulderingRating)
            setYogaRating(response.data.yogaRating)
            setPingpongRating(response.data.pingpongRating)
            setRunningRating(response.data.runningRating)
        } else {
            receiveErrors('You are unauthorized to view this page!')
        }
        return () => {
            clearErrors();
            clearSuccess();
        }
    }, [])

    const sendRatings = async () => {
        const input = {
            id: userInfo._id,
            volleyballRating,
            basketballRating,
            footballRating,
            boulderingRating,
            yogaRating,
            pingpongRating,
            runningRating
        }
        const response = await updateRatings(input)
        if (response) {
            receiveSuccess('User profile updated!');
        } else {
            receiveErrors('Something went wrong!')
        }
    }

    const selectSport = (sport) => {
        const image = document.getElementById('edit-fav-' + sport);
        const div = document.getElementById('add-' + sport + '-div')
        if (image.getAttribute('class') === 'sport-image-select') {
            div.classList.add('toggle-stars')
            return image.classList.remove('sport-image-select');
        } else {
            image.classList.add('sport-image-select');
            div.classList.remove('toggle-stars')
        }
    }

    const [isGeneralStarsVisible, setIsGeneralStarsVisible] = useState(false);

    const showGeneralStars = () => {
        setIsGeneralStarsVisible(true);
    }

    const hideGeneralStars = () => {
        setIsGeneralStarsVisible(false);
    }

    const [isBoulderingStarsVisible, setIsBoulderingStarsVisible] = useState(false);

    const showBoulderingStars = () => {
        setIsBoulderingStarsVisible(true);
    }

    const hideBoulderingStars = () => {
        setIsBoulderingStarsVisible(false);
    }

    const [isYogaStarsVisible, setIsYogaStarsVisible] = useState(false);

    const showYogaStars = () => {
        setIsYogaStarsVisible(true);
    }

    const hideYogaStars = () => {
        setIsYogaStarsVisible(false);
    }

    const [isRunningStarsVisible, setIsRunningStarsVisible] = useState(false);

    const showRunningStars = () => {
        setIsRunningStarsVisible(true);
    }

    const hideRunningStars = () => {
        setIsRunningStarsVisible(false);
    }

    let isUser = false;
    if (userInfo._id === session.userId) {
      isUser = true;
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
                        <p className="registration-message">Add your favorite sports and rate yourself!.</p>
                            <div className="row justify-content-between">
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="edit-fav-volleyball" onClick={() => selectSport('volleyball')} src={volleyball}/>
                                    </div>
                                    <p className="sport-titles text-center">Volleyball</p>
                                    <div id="add-volleyball-div" className="toggle-stars align-stars">
                                        <StarRatings
                                        rating={volleyballRating}
                                        changeRating={(rating) => setVolleyballRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="edit-fav-basketball" onClick={() => selectSport('basketball')} src={basketball}/>
                                    </div>
                                    <p className="sport-titles text-center">Basketball</p>
                                    <div id="add-basketball-div" className="toggle-stars align-stars">
                                        <StarRatings
                                        rating={basketballRating}
                                        changeRating={(rating) => setBasketballRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="edit-fav-football" onClick={() => selectSport('football')} src={football}/>
                                    </div>
                                    <p className="sport-titles text-center">Football</p>
                                    <div id="add-football-div" className="toggle-stars align-stars">
                                        <StarRatings
                                        rating={footballRating}
                                        changeRating={(rating) => setFootballRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-space-between">
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="edit-fav-bouldering" onClick={() => selectSport('bouldering')} src={bouldering}/>
                                    </div>
                                    <p className="sport-titles text-center">Bouldering</p>
                                    <div id="add-bouldering-div" className="toggle-stars align-stars">
                                        <StarRatings
                                        rating={boulderingRating}
                                        changeRating={(rating) => setBoulderingRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="edit-fav-yoga" onClick={() => selectSport('yoga')} src={yoga}/>
                                    </div>
                                    <p className="sport-titles text-center">Yoga</p>
                                    <div id="add-yoga-div" className="toggle-stars align-stars">
                                        <StarRatings
                                        rating={yogaRating}
                                        changeRating={(rating) => setYogaRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="edit-fav-pingpong" onClick={() => selectSport('pingpong')} src={pingpong}/>
                                    </div>
                                    <p className="sport-titles text-center">Table Tennis</p>
                                    <div id="add-pingpong-div" className="toggle-stars align-stars">
                                        <StarRatings
                                        rating={pingpongRating}
                                        changeRating={(rating) => setPingpongRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-space-between">
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="edit-fav-running" onClick={() => selectSport('running')} src={running}/>
                                    </div>
                                    <p className="sport-titles text-center">Running</p>
                                    <div id="add-running-div" className="toggle-stars align-stars">
                                        <StarRatings
                                        rating={runningRating}
                                        changeRating={(rating) => setRunningRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="text-center">Guidance for star ratings:</p>
                            <div className="Terms">
                                <p className="registration-message">Guidance for <span onClick={showGeneralStars} className="pointer"><strong>General Sports.</strong></span></p>
                                <MySportsModal onClose={hideGeneralStars} isTermsVisible={isGeneralStarsVisible}>
                                    <GeneralSportsGuidance />
                                </MySportsModal>
                            </div>
                            <div className="Terms">
                                <p className="registration-message">Guidance for <span onClick={showBoulderingStars} className="pointer"><strong>Bouldering.</strong></span></p>
                                <MySportsModal onClose={hideBoulderingStars} isTermsVisible={isBoulderingStarsVisible}>
                                    <BoulderingGuidance />
                                </MySportsModal>
                            </div>
                            <div className="Terms">
                                <p className="registration-message">Guidance for <span onClick={showYogaStars} className="pointer"><strong>Yoga.</strong></span></p>
                                <MySportsModal onClose={hideYogaStars} isTermsVisible={isYogaStarsVisible}>
                                    <YogaGuidance />
                                </MySportsModal>
                            </div>
                            <div className="Terms">
                                <p className="registration-message">Guidance for <span onClick={showRunningStars} className="pointer"><strong>Running.</strong></span></p>
                                <MySportsModal onClose={hideRunningStars} isTermsVisible={isRunningStarsVisible}>
                                    <RunningGuidance />
                                </MySportsModal>
                            </div>
                            <div className="row justify-content-center">
                                <button onClick={sendRatings} className="add-fav-sports-button pt-2 pb-2">Add Fav Sports</button>
                            </div>
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