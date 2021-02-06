import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { getEvents } from '../actions/event';
import { resetFilters } from '../actions/filter';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { clearErrors } from "../actions/error";
import { clearSuccess } from "../actions/success";
import DesktopSideBar from '../components/DesktopSideBar';
import DesktopFilterBar from '../components/DesktopFilterBar';
import EventCard from '../components/EventCard';
import { getVisibleEvents } from '../util/helpers/filterHelpers';

const mapStateToProps = ({ session, event, filters }) => ({
  session,
  event,
  filters
});

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(getEvents()),
  resetFilters: () => dispatch(resetFilters()),
  clearErrors: () => dispatch(clearErrors()),
  clearSuccess: () => dispatch(clearSuccess())
});


const DashboardPage = ({ session, filters, event, getEvents, resetFilters, clearErrors, clearSuccess }) => {

  useEffect(async () => {
    getEvents();
    resetFilters();
    clearErrors();
    clearSuccess();
  },
    [])

  //const visibleEvents = getVisibleEvents(event, filters); need to fix

  let hasEvents = false;
  const allMyEvents = event.filter(e => e.teammates.some(teammate => teammate._id === session.userId))
  if (event.filter(e => e.teammates.some(teammate => teammate._id === session.userId)).length > 0) {
    hasEvents = true;
  }

  return (
    <div className="silver-background white-background">
      <Header title={'MY SPORTS'} results={allMyEvents.length}/>
      <div className="row justify-content-center m-0 p-0 container-fluid">
        <div className="desktop-sidebar col-3"><DesktopSideBar /></div>
        <div className="col-1 mobile-hide"></div>
        <div className="desktop-card-container col">
        <div className="dashboard-welcome">
          <p>Welcome {session.username}! </p>
          <p>You can now join a match, create an event or update your preferences. {hasEvents? <span>Have a look at your upcoming matches.</span>: <span>You don't seem to be a part of any upcoming matches</span>}</p>
          {!hasEvents && <p><Link className="dashboard-find-event-button" to="/find-event">Find Events</Link></p>}
        </div>
        <div>
          <div className="registration-top-space"></div>
            {allMyEvents.map((myEvents) => {
              return <EventCard event={myEvents} />})}
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
)(DashboardPage);