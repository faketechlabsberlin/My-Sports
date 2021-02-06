import React, { useState } from 'react'
import { connect, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import StarRatings from 'react-star-ratings';
import { receiveSuccess } from '../actions/success';
import SuccessPage from '../components/SuccessPage';
import MySportsModal from "../components/MySportsModal";
import EventChatPage from '../Pages/EventChatPage';
import DesktopSideBar from '../components/DesktopSideBar';
import DesktopFilterBar from '../components/DesktopFilterBar';

const mapStateToProps = ({ event, session, success }) => ({
    event,
    session,
    success
  });  

const mapDispatchToProps = dispatch => ({
  receiveSuccess: (payload) => dispatch(receiveSuccess(payload))
});


const EventPage = ({ session, match, success, receiveSuccess }) => {
  const { id } = match.params
  const event = useSelector(state =>
    state.event.find(event => event._id === id)
  )

  const [isAreYouSureVisible, setIsAreYouSureVisible] = useState(false);


  const myInfo = event.teammates.find(teammate => teammate._id === session.userId)

  if (!event) {
    return (
      <div>
        <h3>Event not found!</h3>
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
      receiveSuccess('You have succesfully joined the event.')
    }

  const leaveEvent = async () => {
    const data = {
    teammateId: session.userId,
    eventId: event._id
    }
    const response = await fetch('/api/event/leaveevent', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const info = await response.json();
    if (response.ok) {
      receiveSuccess('You have succesfully left the event.')
    }
  }

  const deleteEvent = async () => {
    const data = {
      id: event._id
    }
    const response = await fetch('/api/event/', {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const info = await response.json();
    if (response.ok) {
      receiveSuccess('You have succesfully deleted the event.')
    }
  }

  // const removePlayer = async (teammateId) => {
  //   const data = {
  //   teammateId,
  //   eventId: event._id
  //   }
  //   const response = await fetch('/api/event/removeplayer', {
  //       method: 'PUT',
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //   const info = await response.json();
  //   if (response.ok) {
  //       console.log(info)
  //   }
  //   history.push('/dashboard')
  // }
      
    const emptySpots = event.size - event.teammates.length


    let isMember = false;
    const memberCheck = event.teammates.filter((teammate) => {
      const memberMatch = teammate._id.includes(session.userId)
      return memberMatch
    })

    if (memberCheck.length === 1) {
      isMember = true
    }

    let isHost = false;
    if (event.host === session.userId) {
      isHost = true;
    }
    
    if (success) {
      return <SuccessPage success={success} />
    }

    return (
        <div className="silver-background white-background">
          <Header title={'MYSPORTS'} />
          <div className="row justify-content-center m-0 p-0 container-fluid">
            <div className="desktop-sidebar col-3"><DesktopSideBar /></div>
            <div className="col-1 mobile-hide"></div>
            <div className="desktop-card-container col">
              <div>
                <div className="registration-top-space"></div>
                  <div className="form-box-white thick-bottom-border">
                    <div className="card" style={{width: 100 + '%'}}>
                      <div className="card-body">
                        <h3 className="event-page-event-title card-title">{event.title}</h3>
                        <div className={`bottom-border-color-${event.sport} row justify-content-space-between`}>
                          <div className="col">
                            <p className="card-text text-muted">{moment(event.date).format("dddd, MMM Do")}</p>
                            <p className="card-text text-muted">{event.location}</p>
                            {event.court &&  <p className="card-text text-muted">{event.court}</p>}
                          </div>
                            <div className="col">
                              <img className="event-page-sport-image" src={`../images/sport-images/${event.sport}.png`} />
                            </div>
                        </div>
                          <p className="card-text text-muted player-count-text">Players: <span className="error-text">{event.teammates.length}/{event.size}</span></p>
                          {isMember && <div className="row row-cols-5 justify-content-space-between">
                          {event.teammates && event.teammates.map((user, index) => {
                            return <div className="col" key={user._id} ><h6 className={"teammate-icon teammate-icon-color-" + index}><Link to={'/profile/' + user._id}>{user.username[0].toUpperCase()}</Link></h6></div>
                          })}
                          {[...Array(emptySpots)].map((e, i) => <div className="col" key={i}><h6 className="teammate-icon teammate-icon-color-grey"></h6></div>)}
                          </div>}
                          <div className="below-player-border"></div>
                          <p className="card-text text-muted player-skill-text">Average Player Skill Level:</p>
                          <StarRatings
                            rating={event.skill / event.teammates.length}
                            starRatedColor="#E9B467"
                            numberOfStars={5}
                            starDimension="1.2em"
                            starSpacing="0.7px"
                            />
                            {myInfo && ( <div> <p className="card-text text-muted player-skill-text">Your Skill Level:</p>
                            <StarRatings
                            rating={myInfo[`${event.sport}Rating`]}
                            starRatedColor="#E9B467"
                            numberOfStars={5}
                            starDimension="1.2em"
                            starSpacing="0.7px"
                            /> </div> ) }
                            <div className="below-player-border"></div>
                            <p className="card-text text-muted player-skill-text">{event.about || <span>This is a MySports {event.sport} event.</span>}</p>
                            <div className="accordion" id="accordionExample">
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                  </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    {isMember && !isHost && <div className="row justify-content-center"><button className="leave-event-button" onClick={leaveEvent}>Leave Event ?</button></div>}
                                    {isHost && <div><div className="row justify-content-center"><button className="edit-event-button"><Link className="edit-event-link" to={"/event/" + event._id + "/edit"}>Edit Event</Link></button></div><div className="row justify-content-center"><button className="delete-event-button" onClick={() => setIsAreYouSureVisible(true)}>Delete Event</button></div></div>}
                                      {isAreYouSureVisible ? (
                                          <MySportsModal isTermsVisible={isAreYouSureVisible} onClose={() => setIsAreYouSureVisible(false)}>
                                              <h3 className="text-center">Delete Event</h3>
                                              <p className="text-center">Are you sure you want to delete this event?</p>
                                              <div className="row justify-content-center mt-5">
                                                <button className="are-you-sure-button col" onClick={deleteEvent}>Yes</button>
                                                <button className="are-you-not-sure-button col" onClick={() => setIsAreYouSureVisible(false)}>No</button>
                                              </div>
                                          </MySportsModal>
                                      ) : null}
                                    {!isMember && <div className="row justify-content-center"><button className="join-event-button" onClick={joinEvent}>Join Event !</button></div>}
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
            {isMember && (<div className="form-box-white">
            <EventChatPage id={id} event={event} myInfo={myInfo} />
            </div>)}
          </div>
          </div>
          <div className="col-1 mobile-hide"></div>
          <div className="desktop-filterbar col-3"><DesktopFilterBar /></div>
        </div>
      </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventPage);
