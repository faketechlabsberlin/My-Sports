import React from 'react';
import { connect, useSelector } from "react-redux";

const mapStateToProps = ({ session, event }) => ({
    session,
    event
  });

const EditEventPage = ({ session, history, match }) => {
    const { id } = match.params
    const event = useSelector(state =>
    state.event.find(event => event._id === id)
    )

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
    
    const titleRef = React.createRef();
    const sizeRef = React.createRef();
    const dateRef = React.createRef();
    const timeRef = React.createRef();
    const locationRef = React.createRef();

    const editEvent = async (e) => {
        e.preventDefault();
        const eventToEdit = {
            eventId: id,
            title: titleRef.current.value,
            size: sizeRef.current.value,
            date: dateRef.current.value,
            time: timeRef.current.value,
            location: locationRef.current.value,
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
// add min date as today with JS
    return (
        <div>
            <p>Create an event here:</p>
            <form onSubmit={editEvent}>
                <div> 
                    <label htmlFor="title">Event Title:</label>
                    <input id="title" name="title" type="text" defaultValue={event.title} required ref={titleRef}/>
                </div>
                <div> 
                    <label htmlFor="size">Maximum Number of Athelets:</label>
                    <input id="size" name="size" type="number" min="2" max="20" step="1" defaultValue={event.size} required ref={sizeRef}/>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" min="2020-12-12" defaultValue={event.date.slice(0,10)} required ref={dateRef}/>
                </div>
                <div>
                    <label htmlFor="time">Event Time:</label>
                    <select id="time" name="time" required ref={timeRef}>
                        <option value={event.time}>{event.time}</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="night">Night</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location">Event Location:</label>
                    <select id="location" name="location" required ref={locationRef}>
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