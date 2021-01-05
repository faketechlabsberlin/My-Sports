import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import { getEvents } from '../actions/event';
import { Link } from 'react-router-dom';


const mapStateToProps = ({ session, event }) => ({
  session,
  event
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getEvents: () => dispatch(getEvents())
});

class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.getEvents();
  }
  
  render() {
    const  { logout, session, event } = this.props
    return (
      <div>
          <h1>Hi {session.username} </h1>
          <p>Welcome to the My Sports Dashboard Page! What next? Complete your profile and then go ahead and find your team!</p>
          <p><Link to={"/profile/" + session.userId}>View Profile</Link></p>
          <p>View former Events here: * Short list of recent events *</p>
          <p>Your upcoming matches:</p>
            <ul>
              {event.filter(e => e.teammates.some(teammate => teammate._id === session.userId)).map((myEvents) => {
                return <li><Link to={"/event/" + myEvents._id}>{myEvents.title}</Link> on {myEvents.date.slice(0,10)}</li>
              })}
            </ul>
          <p><Link to="/find-event">Find Match</Link></p>
          <p><button onClick={logout}>Logout</button></p>
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashboardPage);