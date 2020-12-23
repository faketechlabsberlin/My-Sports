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
            Welcome to the My Sports Dashboard Page! What next? Complete your profile and then go ahead and find your team!
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashboardPage);