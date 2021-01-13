import React, { useState } from 'react';
import { connect, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

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
            title: e.target.title.value,
            size: e.target.size.value,
            date: moment.parseZone(e.target.date.value),
            time: e.target.time.value,
            location: e.target.location.value,
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
            <p>Create an event here:</p>
            <form onSubmit={editEvent}>
                <div>
                    <label htmlFor="title">Event Title:</label>
                    <input id="title" name="title" type="text" defaultValue={event.title} required />
                </div>
                <div>
                    <label htmlFor="size">Maximum Number of Athelets:</label>
                    <input id="size" name="size" type="number" min="2" max="20" step="1" defaultValue={event.size} required />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <DatePicker
                        id="date"
                        name="date"
                        placeholderText="Select a date "
                        selected={startDate}
                        minDate={new Date()}
                        onChange={date => setStartDate(date)}
                        dateFormat="MMMM d, yyyy"
                        shouldCloseOnSelect={true}
                    />
                </div>
                <div>
                    <label htmlFor="time">Event Time:</label>
                    <select id="time" name="time" required >
                        <option value={event.time}>{event.time}</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="night">Night</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location">Event Location:</label>
                    <select id="location" name="location" required>
                        <option value={event.location}>{event.location}</option>
                        <option value="friedrichshain">Friedrichshain</option>
                        <option value="neukolln">Neukolln</option>
                        <option value="kreuzburg">Kreuzburg</option>
                        <option value="prenzlaur burg">Prenzlaur Burg</option>
                    </select>
                </div>
                <button>Edit Event</button>
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(EditEventPage);