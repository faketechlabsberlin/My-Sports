import React, { useState } from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import { getEvents } from '../actions/event';
import { resetFilters } from '../actions/filter';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import footballicon from '../images/Button_styles/football.png';
import { clearErrors } from "../actions/error";
import { clearSuccess } from "../actions/success";


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
  }, [])
  return (
    <div>
      <Header />
      <div id="welcome">
        <p>Welcome {session.username}! </p>
        <p>You can now join a match, create an event or tell us your preferencies and have a look at matches we found for you.</p>
        <p><Link id="pref-link" to={"/profile/" + session.userId}>Edit preferencies</Link></p>
      </div>
      <div id="dashcontent">
        <p>View former Events here: * Short list of recent events *</p>
        <p>Your upcoming matches:</p>

        <div>

          {event.filter(e => e.teammates.some(teammate => teammate._id === session.userId)).map((myEvents) => {
            return <div>
              <div id="card">
                <Card>
                  <Link to={"/event/" + myEvents._id}>
                    <Card.Header id="cardHeader">{myEvents.title}</Card.Header>
                  </Link>
                  <Card.Body>
                    <blockquote className="blockquote mb-0" id="eventInfo">
                      <div id="dateLocation">
                        <p>
                          {' '}
                          {moment(myEvents.date).format("ddd, MMMM Do, ha")}
                        </p>
                        <p>
                          {myEvents.location}
                        </p>

                      </div>
                      <p className="sport-icon" id="icone">
                      </p>

                    </blockquote>
                    <div id="cardFooter">
                      <p>Players</p>
                      <p>level</p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
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