import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import { getEvents } from '../actions/event';
import { loadDataFunc } from '../actions/filter';
import { Link } from 'react-router-dom';


const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getEvents: () => dispatch(getEvents())
  //loadDataFunc: () => dispatch(loadDataFunc())
});

class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.getEvents();
    //this.props.loadDataFunc();
  }

  render() {
    const  { logout, session } = this.props
    return (
      <div>
          <h1>Hi {session.username} </h1>
          <p>Welcome to the My Sports Dashboard Page! What next? Complete your profile and then go ahead and find your team!</p>
          <p><Link to={"/profile/" + session.userId}>View Profile</Link></p>
          <p>View former Events here: * Short list of recent events *</p>
          <p>Your upcoming matches:</p><Link to="/event/example">Basketball @ Hangar 1</Link>|<Link to="/event/example">Volleyball @ Beach Mitte</Link>
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