import React, { useState } from 'react';
import { connect } from "react-redux";
import { createEvent } from '../actions/event';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import Header from '../components/Header';
import basketball from '../images/sport-images/basketball.png';
import bouldering from '../images/sport-images/bouldering.png';
import football from '../images/sport-images/football.png';
import pingpong from '../images/sport-images/pingpong.png';
import running from '../images/sport-images/running.png';
import volleyball from '../images/sport-images/volleyball.png';
import yoga from '../images/sport-images/yoga.png';
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    createEvent: payload => dispatch(createEvent(payload))
});

const CreateEventPage = ({ session, createEvent, history }) => {
    const submitEvent = async (e) => {
        e.preventDefault();
        const event = {
            title,
            sport,
            size,
            date: moment.parseZone(startDate),
            time,
            location,
            host: session.userId,
            about,
            court
        }
        const response = await fetch('api/event', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.ok) {
            createEvent(data)
            history.push('/dashboard')
        }
    }

    const selectSport = (sport) => {
        const oldSelection = document.getElementsByClassName('sport-image-select')
        for (let i=0; i<oldSelection.length; i++) {
            oldSelection[i].classList.remove('sport-image-select');
          }
        const image = document.getElementById('create-fav-' + sport);
        image.classList.add('sport-image-select');
        setSport(sport)
    }

    const [sport, setSport] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState('')
    const [size, setSize] = useState(2)
    const [sizeError, setSizeError] = useState('')
    const [isNameVisible, setIsNameVisible] = useState(true);
    const [isSportVisible, setIsSportVisible] = useState(false);
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [isDateVisible, setIsDateVisible] = useState(false);
    const [isLocationVisible, setIsLocationVisible] = useState(false);
    const [isSummaryVisible, setIsSummaryVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [location, setLocation] = useState('');
    const [court, setCourt] = useState('');
    const [time, setTime] = useState('');

    const addSize = () => {
        if (size < 20) {
            setSizeError('')
            setSize(size+1);
        } else {
        setSizeError('20 is the largest event size we support right now')
        }
    }

    const minusSize = () => {
        if (size > 2) {
            setSizeError('')
            setSize(size-1);
        } else {
        setSizeError('2 is the smallest event size required to create an event')
    }
    }

    const acceptTitle = (e) => {
        e.preventDefault();
        if (e.target.title.value) {
            setErrorMessage('')
            setTitle(e.target.title.value);
            setAbout(e.target.about.value);
            setIsNameVisible(false);
            setIsSportVisible(true);
        } else {
            setErrorMessage('You must select a title for your event!')
        }
    }

    const acceptSport = (e) => {
        e.preventDefault();
        if (sport) {
            setErrorMessage('')
            setIsSportVisible(false);
            setIsAmountVisible(true);
        } else {
            setErrorMessage('You must select a sport!')
        }
    }

    const acceptAmount = () => {
            setErrorMessage('')
            setIsAmountVisible(false);
            setIsDateVisible(true);
    }

    const hideSport = () => {
        setErrorMessage('')
        setIsSportVisible(false);
        setIsNameVisible(true);
    }

    const hideAmount = () => {
        setErrorMessage('')
        setIsAmountVisible(false);
        setIsSportVisible(true);
    }

    const hideDate = () => {
        setIsDateVisible(false);
        setIsAmountVisible(true);
    }

    const hideLocation = () => {
        setIsLocationVisible(false);
        setIsDateVisible(true);
    }

    const acceptDate = (e) => {
        e.preventDefault();
        if (e.target.time.value) {
            setErrorMessage('')
            setTime(e.target.time.value)
            setIsDateVisible(false);
            setIsLocationVisible(true);
        } else {
            setErrorMessage('You must select a time!')
        }
    }

    const acceptLocation = (e) => {
        e.preventDefault();
        if (e.target.location.value) {
            setErrorMessage('')
            setLocation(e.target.location.value);
            setCourt(e.target.court.value);
            setIsLocationVisible(false);
            setIsSummaryVisible(true);
        } else {
            setErrorMessage('You must select a location for your event!')
        }
    }


    const summaryToTitle = () => {
        setIsSummaryVisible(false)
        setIsNameVisible(true);
    }

    const summaryToSport = () => {
        setIsSummaryVisible(false)
        setIsSportVisible(true);
    }

    const summaryToSize = () => {
        setIsSummaryVisible(false)
        setIsAmountVisible(true);
    }

    const summaryToDate = () => {
        setIsSummaryVisible(false)
        setIsDateVisible(true);
    }

    const summaryToLocation = () => {
        setIsSummaryVisible(false)
        setIsLocationVisible(true);
    }

    return (
        <div>
            <Header title='NEW EVENT' />
            <div className="silver-background container-fluid">
                <div className="desktop-container">
                    <div>.</div>
                    {isNameVisible && ( <motion.div className="form-box-white" initial="hidden" animate="visible" variants={{
                        hidden: {
                            scale: .8,
                            opacity: 0
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: .4
                            }
                        },
                    }}>
                        <form onSubmit={acceptTitle}>
                            <p className="text-muted event-title-header">Event title</p>
                            <div>
                                <input className="create-event-title" defaultValue={title} placeholder="give your event a name..." maxLength="30" id="title" name="title" type="text" />
                            </div>
                            <div>
                            <p className="text-muted optional-text">Optional:</p>
                            <p className="text-muted optional-instructions">If you like, you can add a short description for your event here.</p>
                                <textarea className="create-event-about" maxLength="150" id="about" defaultValue={about} name="about"></textarea> 
                            </div>
                            {errorMessage && <p className="error-text">{errorMessage}</p>}
                            <div className="row justify-content-between create-event-bottom-box">
                                <Link className="col" to="/find-event"><i className="material-icons md-48 pointer back-arrow black-icon">arrow_back</i></Link>
                                <button className="next-button-with-back col col-md-3">Next</button>
                            </div>
                            <div className="row"><div className="col title-selection-marker"></div><div className="col"></div><div className="col"></div><div className="col"></div><div className="col"></div></div>
                        </form>
                    </motion.div> )}
                    {isSportVisible && (<motion.div className="form-box-white" initial="hidden" animate="visible" variants={{
                        hidden: {
                            scale: .8,
                            opacity: 0
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: .4
                            }
                        },
                    }}>
                        <form onSubmit={acceptSport}>
                            <p className="text-muted event-sport-header">Sport selection</p>
                            <div className="row justify-content-between mb-3">
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="create-fav-volleyball" onClick={() => selectSport('volleyball')} src={volleyball}/>
                                    </div>
                                    <p className="sport-titles text-center">Volleyball</p>
                                </div>
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="create-fav-basketball" onClick={() => selectSport('basketball')} src={basketball}/>
                                    </div>
                                    <p className="sport-titles text-center">Basketball</p>
                                </div>
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="create-fav-football" onClick={() => selectSport('football')} src={football}/>
                                    </div>
                                    <p className="sport-titles text-center">Football</p>
                                </div>
                            </div>
                            <div className="row justify-content-between mb-3">
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="create-fav-bouldering" onClick={() => selectSport('bouldering')} src={bouldering}/>
                                    </div>
                                    <p className="sport-titles text-center">Bouldering</p>
                                </div>
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="create-fav-yoga" onClick={() => selectSport('yoga')} src={yoga}/>
                                    </div>
                                    <p className="sport-titles text-center">Yoga</p>
                                </div>
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="create-fav-pingpong" onClick={() => selectSport('pingpong')} src={pingpong}/>
                                    </div>
                                    <p className="sport-titles text-center">Table Tennis</p>
                                </div>
                            </div>
                            <div className="row justify-content-between mb-3">
                                <div className="col">
                                    <div className="sport-selector">
                                        <img id="create-fav-running" onClick={() => selectSport('running')} src={running}/>
                                    </div>
                                    <p className="sport-titles text-center">Running</p>
                                </div>
                            </div>
                        {errorMessage && <p className="error-text">You must select a sport!</p>}
                        <div className="row justify-content-between create-event-bottom-box">
                            <i onClick={hideSport} className="material-icons md-48 pointer back-arrow black-icon col">arrow_back</i>
                            <button className="next-button-with-back col col-md-3">Next</button>
                        </div>
                        <div className="row"><div className="col title-selection-marker"></div><div className="col sport-selection-marker"></div><div className="col"></div><div className="col"></div><div className="col"></div></div>
                    </form>
                    </motion.div> )}
                    {isAmountVisible && ( <motion.div className="form-box-white" initial="hidden" animate="visible" variants={{
                        hidden: {
                            scale: .8,
                            opacity: 0
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: .4
                            }
                        },
                    }}>
                        <p className="text-muted event-amount-header">Amount of players</p>
                        <p className="text-muted text-center">Maximum amount of players</p>
                        <div className="number-container"><i onClick={addSize} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_up</i></div>
                        <div className="number-container">{size}</div>
                        <div className="number-container"><i onClick={minusSize} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_down</i></div>
                        {sizeError && <p className="error-text">{sizeError}</p>}
                    <div className="row justify-content-between create-event-bottom-box">
                        <i onClick={hideAmount} className="col material-icons md-48 pointer back-arrow black-icon">arrow_back</i>
                        <button onClick={acceptAmount} className="col col-md-3 next-button-with-back">Next</button>
                    </div>
                    <div className="row"><div className="col title-selection-marker"></div><div className="col sport-selection-marker"></div><div className="col size-selection-marker"></div><div className="col"></div><div className="col"></div></div>
                    </motion.div> )}
                    {isDateVisible && ( <motion.div className="form-box-white" initial="hidden" animate="visible" variants={{
                        hidden: {
                            scale: .8,
                            opacity: 0
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: .4
                            }
                        },
                    }}>
                        <form onSubmit={acceptDate}>
                            <p className="text-muted event-date-header">Date & time</p>
                            <div className="create-event-date-selector row justify-content-center">
                                <DatePicker
                                    id="date-create-event"
                                    name="date"
                                    utcOffset={0}
                                    placeholderText="Select a date"
                                    selected={startDate}
                                    minDate={startDate}
                                    onChange={date => setStartDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                    shouldCloseOnSelect={true}
                                />
                            </div>
                            <div className="row justify-content-center">
                                <select className="col-9 col-md-6" defaultValue={time} id="time-create-event" name="time">
                                    <option value="">Please select a time</option>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="evening">Evening</option>
                                    <option value="night">Night</option>
                                </select>
                            </div>
                            {errorMessage && <p className="error-text">{errorMessage}</p>}
                            <div className="row justify-content-between create-event-bottom-box">
                                <i onClick={hideDate} className="col material-icons md-48 pointer back-arrow black-icon">arrow_back</i>
                                <button className="col col-md-3 next-button-with-back">Next</button>
                            </div>
                            <div className="row"><div className="col title-selection-marker"></div><div className="col sport-selection-marker"></div><div className="col size-selection-marker"></div><div className="col date-selection-marker"></div><div className="col"></div></div>
                        </form>
                    </motion.div> )}
                    {isLocationVisible && ( <motion.div className="form-box-white" initial="hidden" animate="visible" variants={{
                        hidden: {
                            scale: .8,
                            opacity: 0
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: .4
                            }
                        },
                    }}>
                        <form onSubmit={acceptLocation}>
                            <p className="text-muted event-location-header">Location</p>
                            <div className="row justify-content-center">
                                <select defaultValue={location} className="col-9 col-md-6" id="location-create-event" name="location">
                                    <option value="">Choose a location</option>
                                    <option value="Charlottenburg">Charlottenburg</option>
                                    <option value="Friedrichshain">Friedrichshain</option>
                                    <option value="Kreuzberg">Kreuzberg</option>
                                    <option value="Mitte">Mitte</option>
                                    <option value="Moabit">Moabit</option>
                                    <option value="Neukolln">Neukolln</option>
                                    <option value="Prenzlauer-Berg">PrenzLauer-Berg</option>
                                    <option value="Schoneberg">Schoneberg</option>
                                    <option value="Tempelhof">Tempelhof</option>
                                    <option value="Tiergarten">Tiergarten</option>
                                    <option value="Wilmersdorf">Wilmersdorf</option>
                                </select>
                            </div>
                            <div>
                            <p className="text-muted optional-text">Optional:</p>
                            <p className="text-muted optional-instructions">If you like, you can add a specific location or choose one later after discussing with your teammates.</p>
                                <input defaultValue={court} className="create-event-title" placeholder="eg. Hangar 1" maxLength="30" id="court" name="court" />
                            </div>
                            <div className="row justify-content-between create-event-bottom-box">
                                <i onClick={hideLocation} className="col material-icons md-48 pointer back-arrow black-icon">arrow_back</i>
                                <button className="col col-md-3 next-button-with-back">Next</button>
                            </div>
                            <div className="row"><div className="col title-selection-marker"></div><div className="col sport-selection-marker"></div><div className="col size-selection-marker"></div><div className="col date-selection-marker"></div><div className="col location-selection-marker"></div></div>
                        </form>
                    </motion.div> )}
                    {isSummaryVisible && ( <motion.div className="form-box-white" initial="hidden" animate="visible" variants={{
                        hidden: {
                            scale: .8,
                            opacity: 0
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: .4
                            }
                        },
                    }}>
                        <form onSubmit={submitEvent}>
                            <p className="text-center event-summary-header">Almost Done!</p>
                            <p className="text-center event-summary-sub">Here is your event!</p>
                            <p className="text-muted text-center">Please review your event and change anything that might not look right to you.</p>
                            <div className="row"><div className="col title-selection-marker"></div><div className="col sport-selection-marker"></div><div className="col size-selection-marker"></div><div className="col date-selection-marker"></div><div className="col location-selection-marker"></div></div>
                            <div className="ml-1 mr-1 row mt-3 summary-item">
                                <div className="col ml-2">
                                    <p className="text-muted mb-2">Title:</p>
                                    <p className="summary-answer">{title}</p>
                                </div>
                                <div className="col-3 col-md-2"><i onClick={summaryToTitle} className="material-icons md-48 pointer blue-icon">keyboard_arrow_right</i></div>
                            </div>
                            {about && <div className="ml-1 mr-1 row mt-3 summary-item">
                                <div className="col ml-2">
                                    <p className="text-muted mb-2">About:</p>
                                    <p className="summary-answer">{about}</p>
                                </div>
                                <div className="col-3 col-md-2 align-self-center"><i onClick={summaryToTitle} className="material-icons md-48 pointer blue-icon">keyboard_arrow_right</i></div>
                            </div>}
                            <div className="ml-1 mr-1 row mt-3 summary-item">
                                <div className="col ml-2">
                                    <p className="text-muted mb-2">Sport:</p>
                                    <p className="summary-answer">{sport}</p>
                                </div>
                                <div className="col-3 col-md-2"><i onClick={summaryToSport} className="material-icons md-48 pointer blue-icon">keyboard_arrow_right</i></div>
                            </div>
                            <div className="ml-1 mr-1 row mt-3 summary-item">
                                <div className="col ml-2">
                                    <p className="text-muted mb-2">Event Size:</p>
                                    <p className="summary-answer">{size} players</p>
                                </div>
                                <div className="col-3 col-md-2"><i onClick={summaryToSize} className="material-icons md-48 pointer blue-icon">keyboard_arrow_right</i></div>
                            </div>
                            <div className="ml-1 mr-1 row mt-3 summary-item">
                                <div className="col ml-2">
                                    <p className="text-muted mb-2">Date:</p>
                                    <p className="summary-answer">{moment.parseZone(startDate).format('D MMMM')}</p>
                                </div>
                                <div className="col-3 col-md-2"><i onClick={summaryToDate} className="material-icons md-48 pointer blue-icon">keyboard_arrow_right</i></div>
                            </div>
                            <div className="ml-1 mr-1 row mt-3 summary-item">
                                <div className="col ml-2">
                                    <p className="text-muted mb-2">Time:</p>
                                    <p className="summary-answer">{time} time</p>
                                </div>
                                <div className="col-3 col-md-2"><i onClick={summaryToDate} className="material-icons md-48 pointer blue-icon">keyboard_arrow_right</i></div>
                            </div>
                            <div className="ml-1 mr-1 row mt-3 summary-item">
                                <div className="col ml-2">
                                    <p className="text-muted mb-2">Location:</p>
                                    <p className="summary-answer">{location}</p>
                                </div>
                                <div className="col-3 col-md-2"><i onClick={summaryToLocation} className="material-icons md-48 pointer blue-icon">keyboard_arrow_right</i></div>
                            </div>
                            {court && <div className="ml-1 mr-1 row mt-3 summary-item">
                                <div className="col ml-2">
                                    <p className="text-muted mb-2">Specific Location:</p>
                                    <p className="summary-answer">{court}</p>
                                </div>
                                <div className="col-3 col-md-2"><i onClick={summaryToLocation} className="material-icons md-48 pointer blue-icon">keyboard_arrow_right</i></div>
                            </div>}
                            <div className="row justify-content-center mt-5">
                                <button className="col-6 col-md-3 next-button-with-back pt-2 pb-2">Done!</button>
                            </div>
                        </form>
                    </motion.div> )}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);