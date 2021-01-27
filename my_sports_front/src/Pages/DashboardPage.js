import React, { useEffect, useState } from 'react'
import { connect, useSelector } from "react-redux";
import { logout } from "../actions/session";
import { getEvents } from '../actions/event';
import { resetFilters } from '../actions/filter';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import { clearErrors } from "../actions/error";
import { clearSuccess } from "../actions/success";
import StarRatings from 'react-star-ratings';

const mapStateToProps = ({ session, event }) => ({
  session,
  event
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getEvents: () => dispatch(getEvents()),
  resetFilters: () => dispatch(resetFilters()),
  clearErrors: () => dispatch(clearErrors()),
  clearSuccess: () => dispatch(clearSuccess())
});

const DashboardPage = ({ logout, session, event, getEvents, resetFilters, clearErrors, clearSuccess }) => {

  useEffect(async () => {
    getEvents();
    resetFilters();
    clearErrors();
    clearSuccess();
    const div = document.getElementById('border-bottom-color')
    div.classList.add(`bottom-border-color-${event.sport}`)
  },
    [])

  return (
    <div>
      <div id="header-div">
        <Header />
      </div>
      <div id="border-bottom" />
      <div id="welcome">
        <p>Welcome {session.username}! </p>
        <p>You can now join a match, create an event or tell us your preferencies and have a look at matches we found for you.</p>
        <p><Link id="pref-link" to={"/profile/" + session.userId}>Edit preferencies</Link></p>
      </div>
      <div id="dashcontent">
        <p>Your upcoming matches:</p>
        <div>

          {event.filter(e => e.teammates.some(teammate => teammate._id === session.userId)).map((myEvents) => {
            return <div>
              <Card className="card-event">
                <Link to={"/event/" + myEvents._id}>
                  <Card.Header id="cardHeader">{myEvents.title}</Card.Header>
                </Link>
                <Card.Body>
                  <blockquote className="blockquote mb-0" id="eventInfo">
                    <div className="dateLocation" id="border-bottom-color">
                      <p>{moment(myEvents.date).format("ddd, MMMM Do, ha")}</p>
                      <p>{myEvents.location}</p>
                    </div>
                    <img className="sport-icon" id="icone" src={`../images/sport-images/${myEvents.sport}.png`} />
                  </blockquote>
                  <div id="cardFooter">
                    <p className="card-text text-muted player-count-text">Players: <span className="error-text">{myEvents.teammates.length}/{myEvents.size}</span></p>
                    <p className="card-text text-muted player-count-text">Skill Level:
                      <StarRatings
                        rating={myEvents.SkillLevel}
                        starRatedColor="#E9B467"
                        numberOfStars={5}
                        starDimension="1.2em"
                        starSpacing="0.7px"
                      />
                    </p>
                  </div>
                </Card.Body>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <button className="edit-event-button"><Link className="edit-event-link" to={"/event/" + myEvents._id}>Event Details</Link></button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          })}
        </div>
        <p><Link to="/find-event">Find Match</Link></p>
        <p><button onClick={logout}>Logout</button></p>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);