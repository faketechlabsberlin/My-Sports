import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

const DesktopSideBar = ({ session, logout}) => {

    return (
        <div>
            <div className="side-bar-head">
                <div className="flex">
                    <span className="desktop-side-bar-identifier">{session.username[0].toUpperCase()}</span>
                    <p className="desktop-side-bar-username">{session.username.toUpperCase()}</p>
                </div>
            </div>
            <div className="desktop-side-bar-content-menu">
                <div className="hover-effect"><Link to={"/profile/" + session.userId} className="menu-item">View Profile</Link></div>
                <div className="hover-effect"><Link to="/create-event" id="desktop-side-bar-create-event" className="menu-item">+ Create Event</Link></div>
                <div className="hover-effect"><Link to="/find-event" className="menu-item">Find events</Link></div>
                <div className="hover-effect"><Link to="/dashboard" className="menu-item">Upcoming</Link></div>
                <div className="hover-effect"><Link to={"/profile/" + session.userId} className="menu-item">Played</Link></div>
            </div>
            <div className="hover-effect"><Link onClick={logout} className="menu-item">Logout</Link></div>   
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(DesktopSideBar);
