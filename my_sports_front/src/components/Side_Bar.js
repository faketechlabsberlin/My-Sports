import React from 'react'
import { slide as Menu } from "react-burger-menu";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

const mapStateToProps = ({ session, event }) => ({
    session,
    event
});

const Side_Bar = ({ props, event, session }) => {

    return (
        <div id="Menu">
            <Menu {...props}>
                <div className="top-menu">
                    <div>
                        {event.teammates && event.teammates.map((user, index) => {
                            return <div key={user._id} className={"col teammate-icon teammate-icon-color-" + index}><h6>{user.username[0].toUpperCase()}</h6></div>
                        })}
                    </div>
                    <p><Link to="/profile" id="edit-profile">Edit profile</Link></p>
                    <p id="username">{session.username}</p>
                </div>
                <div id="search-div">
                    <input type="text" className="search-menu" placeholder=" Search for event name" />
                </div>
                <div className="content-menu">
                    <Link to="/create-event" className="menu-item">Create Event</Link>
                    <Link to="/find-event" className="menu-item">Find events</Link>
                    <Link to="/" className="menu-item">Upcoming</Link>
                    <Link to="/" className="menu-item">Played</Link>
                </div>
            </Menu>

        </div >

    );
};

export default connect(
    mapStateToProps)(Side_Bar);