import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});


const DashboardPage = ({ logout, session }) => {
    return (
        <div>
            <h1>Hi {session.username} </h1>
            <p>Welcome to the My Sports Dashboard Page! What next? Complete your profile and then go ahead and find your team!</p>
            <p><a href={"/profile/" + session.userId}>View Profile</a></p>
            <p>View former Events here: * Short list of recent events *</p>
            <p>Your upcoming matches:</p><a href="/event/example">Basketball @ Hangar 1</a>|<a href="/event/example">Volleyball @ Beach Mitte</a>
            <p><a href="/find-event">Find Match</a></p>
            <p><button onClick={logout}>Logout</button></p>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashboardPage);