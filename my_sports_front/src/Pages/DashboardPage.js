import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { getEvents } from '../actions/event';
import { resetFilters } from '../actions/filter';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import { clearErrors } from "../actions/error";
import { clearSuccess } from "../actions/success";
import StarRatings from 'react-star-ratings';

const mapStateToProps = ({ session, event }) => ({
  session,
  event
});

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(getEvents()),
  resetFilters: () => dispatch(resetFilters()),
  clearErrors: () => dispatch(clearErrors()),
  clearSuccess: () => dispatch(clearSuccess())
});

const DashboardPage = ({ session, event, getEvents, resetFilters, clearErrors, clearSuccess }) => {

  useEffect(async () => {
    getEvents();
    resetFilters();
    clearErrors();
    clearSuccess();
  },
    [])

  let hasEvents = false;
  if (event.filter(e => e.teammates.some(teammate => teammate._id === session.userId)).length > 0) {
    hasEvents = true;
  }

  return (
    <div>
      <div>
        <Header title={'MY SPORTS'}/>
      </div>
      <div className="dashboard-welcome">
        <p>Welcome {session.username}! </p>
        <p>You can now join a match, create an event or update your preferences. {hasEvents? <span>Have a look at your upcoming matches.</span>: <span>You don't seem to be a part of any upcoming matches</span>}</p>
        {!hasEvents && <p><Link className="dashboard-find-event-button" to="/find-events">Find Events</Link></p>}
      </div>
      <div className="silver-background container-fluid">
        <div className="registration-top-space"></div>
          {event.filter(e => e.teammates.some(teammate => teammate._id === session.userId)).map((myEvents) => {
            return <div className="form-box-white thick-bottom-border">
              <div className="card" style={{width: 100 + '%'}}>
              <div className="card-body">
                <h3 className="event-page-event-title card-title">{myEvents.title}</h3>
                <div className={`bottom-border-color-${myEvents.sport} row justify-content-space-between`}>
                  <div className="col">
                    <p className="card-text text-muted">{moment(myEvents.date).format("dddd, MMM Do")}</p>
                    <p className="card-text text-muted">{myEvents.location}</p>
                    {myEvents.court &&  <p className="card-text text-muted">{myEvents.court}</p>}
                  </div>
                    <div className="col">
                      <img className="event-page-sport-image" src={`../images/sport-images/${myEvents.sport}.png`} />
                    </div>
                </div>
                <div className="row">
                  <p id="dashboard-player" className="col card-text text-muted player-count-text">Players: <span className="error-text">{myEvents.teammates.length}/{myEvents.size}</span></p>
                  <p id="dashboard-stars" className="col dashboard-stars"><StarRatings
                      rating={myEvents.skill / myEvents.teammates.length}
                      starRatedColor="#E9B467"
                      numberOfStars={5}
                      starDimension="1.2em"
                      starSpacing="0.7px"
                      /></p>
                </div>
                <div className="accordion" id={"accordionExample" + myEvents._id}>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id={"heading" + myEvents._id}>
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + myEvents._id} aria-expanded="true" aria-controls={"collapse"+ myEvents._id}>
                        </button>
                      </h2>
                      <div id={"collapse"+ myEvents._id} className="accordion-collapse collapse" aria-labelledby={"heading"+ myEvents._id} data-bs-parent={"#accordionExample"+ myEvents._id}>
                        <div className="accordion-body">
                          <div><button className="edit-event-button"><Link className="edit-event-link" to={"/event/" + myEvents._id}>View Event</Link></button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          })}
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);