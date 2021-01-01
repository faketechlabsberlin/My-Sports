import React from 'react'
import { connect, useSelector } from "react-redux";
import { getSpecificEvent } from '../actions/event';
import * as apiUtil from '../util/event';

const mapStateToProps = ({ event, session }) => ({
    event,
    session
  });  


const EventPage = ({ session, match }) => {
  const { id } = match.params
  const event = useSelector(state =>
    state.event.find(event => event._id === id)
  )

  if (!event) {
    return (
      <div>
        <h2>Event not found!</h2>
      </div>
    )
  }

  const joinEvent = async () => {
      const data = {
      teammateId: session.userId,
      eventId: event._id
      }
      const response = await fetch('/api/event/joinevent', {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const info = await response.json();
      if (response.ok) {
          console.log(info)
      }
    }
    return (
        <div>
            <h3>{event.title}</h3>
            <p>This is a MySports <b>{event.sport}</b> event.</p>
            <p>Spots Left: <b>{event.teammates? event.size - event.teammates.length: 0}</b></p>
            <p>To be played in: <b>{event.location}</b> on <b>{event.date?event.date.slice(0, 9): 0}</b> in the <b>{event.time}</b>.</p>
            <p>Please confirm exact time in the chat.</p>
            <p>Average Player Skill Level for this event:</p>
            <p>Current teammates include: </p>
              <ul>
                {event.teammates && event.teammates.map((user) => {
                  return <li>{user.username}</li>
                })}
              </ul>
            {event.equipment? <p>All required equipment will be supplied</p>: <p>*Please note equipment for the event is still required</p>}
            {event.teammates && event.teammates.includes(session.userId)? <button>Leave Event</button>: <button onClick={joinEvent}>Join Event</button>}
        </div>
    )
}

export default connect(
    mapStateToProps
  )(EventPage);
