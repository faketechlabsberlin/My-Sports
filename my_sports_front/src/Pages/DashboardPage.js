import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import { getEvents } from '../actions/event';
import { resetFilters } from '../actions/filter';
import { Link } from 'react-router-dom';
import moment from 'moment';


const mapStateToProps = ({ session, event }) => ({
  session,
  event
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getEvents: () => dispatch(getEvents()),
  resetFilters: () => dispatch(resetFilters())
});

class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.getEvents();
    this.props.resetFilters();
  }

  render() {
    const { logout, session, event } = this.props
    return (
      <div>
        <nav id="navbar">
          <button class="material-icons" id="menu-icon">menu</button>
          <h2 id="logo">MY SPORTS</h2>
          <span class="material-icons" id="filter-icon">filter_alt</span>
        </nav>
        <div id="welcome">
          <p>Welcome {session.username}! </p>
          <p>You can now join a match, create an event or tell us your preferencies and have a look at matches we found for you.</p>
          <Link id="pref-link" to={"/profile/" + session.userId}>Edit preferencies</Link>
        </div>
        <div id="dashcontent">
          <p>View former Events here: * Short list of recent events *</p>
          <p>Your upcoming matches:</p>
          <ul>
            {event.filter(e => e.teammates.some(teammate => teammate._id === session.userId)).map((myEvents) => {
              return <li><Link to={"/event/" + myEvents._id}>{myEvents.title}</Link> on {moment(myEvents.date).format("dddd, MMMM Do")}</li>
            })}
          </ul>
          <p><Link to="/find-event">Find Match</Link></p>
          <p><button onClick={logout}>Logout</button></p>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);