import React from 'react'
import { stack as Menu } from "react-burger-menu";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { logout } from "../actions/session";
import { filterByName } from '../actions/filter';


const mapStateToProps = ({ session }) => ({
    session,
});

const mapDispatchToProps = dispatch => ({
    filterByName: (payload) => dispatch(filterByName(payload)),
    logout: () => dispatch(logout())
})

const SideBar = ({ session, logout, filterByName }) => {

    const filterByInput = (e) => {
        let input = e.target.value;
        filterByName({ value: input })
    }

    return (
        <div className="side-bar">
            <Menu>
                <div className="side-bar-head">
                    <div className="flex">
                        <span className="side-bar-identifier">{session.username[0].toUpperCase()}</span>
                        <Link to={"/profile/" + session.userId} className="side-bar-head-text mt-4">View Profile</Link>
                    </div>
                    <p className="side-bar-username">{session.username.toUpperCase()}</p>
                    <p className="side-bar-email">{session.email}</p>
                </div>
                <div>
                    <form className="side-bar-search-form row justify-content-between">
                        <input onChange={e => { filterByInput(e) }} type="text" className="side-bar-search-input" placeholder="Search for event name" required/><button disabled className="side-bar-search-button"><i className="pointer material-icons md-24 grey-icon">search</i></button>
                    </form>
                </div>
                <div className="side-bar-content-menu">
                    <Link to="/create-event" id="side-bar-create-event" className="menu-item">+ Create Event</Link>
                    <Link to="/find-event" className="menu-item">Find Events</Link>
                    <Link to="/dashboard" className="menu-item">Upcoming Events</Link>
                    <Link to={"/profile/" + session.userId} className="menu-item">Played Events</Link>
                </div>
                <Link onClick={logout} className="menu-item pt-3">Logout</Link>
            </Menu>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(SideBar);