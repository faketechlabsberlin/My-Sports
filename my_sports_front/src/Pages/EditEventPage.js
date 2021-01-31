import React, { useState } from 'react';
import { connect, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ session, event }) => ({
    session,
    event
});

const EditEventPage = ({ session, history, match }) => {
    const { id } = match.params
    const event = useSelector(state =>
        state.event.find(event => event._id === id)
    )

    const [startDate, setStartDate] = useState(new Date(event.date));
    const [errorMessage, setErrorMessage] = useState('')
    const [size, setSize] = useState(event.size)
    const [sizeError, setSizeError] = useState('')
    const [isNameVisible, setIsNameVisible] = useState(true);
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [isDateVisible, setIsDateVisible] = useState(false);
    const [isLocationVisible, setIsLocationVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
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
            setIsAmountVisible(true);
        } else {
            setErrorMessage('You must select a title for your event!')
        }
    }

    const acceptAmount = () => {
            setErrorMessage('')
            setIsAmountVisible(false);
            setIsDateVisible(true);
    }

    const hideAmount = () => {
        setErrorMessage('')
        setIsAmountVisible(false);
        setIsNameVisible(true);
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

    let isHost = false;
    if (event.host === session.userId) {
        isHost = true;
    }

    if (!isHost) {
        return (
            <div>
                <p>You do not have permission to view this page</p>
            </div>
        )
    }

    const editEvent = async (e) => {
        e.preventDefault();
        const eventToEdit = {
            eventId: id,
            title,
            about,
            size,
            date: moment.parseZone(startDate),
            time,
            location: e.target.location.value,
            court: e.target.court.value
        }
        const response = await fetch('/api/event/', {
            method: 'PUT',
            body: JSON.stringify(eventToEdit),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.ok) {
            console.log(data)
            history.push('/dashboard')
        }
    }

    return (
        <div>
        <Header title='EDIT EVENT' />
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
                            <input className="create-event-title" defaultValue={event.title} placeholder="give your event a name..." maxLength="30" id="title" name="title" type="text" />
                        </div>
                        <div>
                        <p className="text-muted optional-text">Optional:</p>
                        <p className="text-muted optional-instructions">If you like, you can add a short description for your event here.</p>
                            <textarea className="create-event-about" maxLength="150" id="about" defaultValue={event.about} name="about"></textarea> 
                        </div>
                        {errorMessage && <p className="error-text">{errorMessage}</p>}
                        <div className="row justify-content-between create-event-bottom-box">
                            <Link className="col" to={"/event/" + event._id}><i className="material-icons md-48 pointer back-arrow black-icon">arrow_back</i></Link>
                            <button className="next-button-with-back col">Next</button>
                        </div>
                        <div className="row"><div className="col title-selection-marker"></div><div className="col"></div><div className="col"></div><div className="col"></div><div className="col"></div></div>
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
                            <select className="col-9 col-md-6" defaultValue={event.time} id="time-create-event" name="time">
                                <option value="">Please select a time</option>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                                <option value="night">Night</option>
                            </select>
                        </div>
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
                    <form onSubmit={editEvent}>
                        <p className="text-muted event-location-header">Location</p>
                        <div className="row justify-content-center">
                            <select className="col-9 col-md-6" id="location-create-event" name="location" defaultValue={event.location} required>
                                <option value="">Choose a location</option>
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
                        <div>
                        <p className="text-muted optional-text">Optional:</p>
                        <p className="text-muted optional-instructions">If you like, you can add a specific location or choose one later after discussing with your teammates.</p>
                            <input className="create-event-title" placeholder="eg. Hangar 1" maxLength="30" id="court" name="court" defaultValue={event.court} />
                        </div>
                        <div className="row justify-content-between create-event-bottom-box">
                            <i onClick={hideLocation} className="col material-icons md-48 pointer back-arrow black-icon">arrow_back</i>
                            <button className="col col-md-3 next-button-with-back">Next</button>
                        </div>
                        <div className="row"><div className="col title-selection-marker"></div><div className="col sport-selection-marker"></div><div className="col size-selection-marker"></div><div className="col date-selection-marker"></div><div className="col location-selection-marker"></div></div>
                    </form>
                </motion.div> )}
            </div>
        </div>
    </div>
    )
}

export default connect(mapStateToProps)(EditEventPage);