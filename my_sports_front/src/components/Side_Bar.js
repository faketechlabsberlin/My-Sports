import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom';

export default props => {
    return (
        <div id="Menu">
            <Menu {...props}>

                <div className="top-menu">
                    <p>Edit profile</p>
                    <p>Username</p>
                    <p>Username.com</p>
                </div>


                <div id="search-div">
                    <input type="text" className="search-menu" placeholder=" Search for event name" />
                </div>
                <div className="content-menu">
                    <Link to="/create-event" className="menu-item">
                        Create Event
      </Link>

                    <Link to="/find-event" className="menu-item">
                        Find events
      </Link>

                    <Link to="/my-event" className="menu-item">
                        Upcoming
      </Link>

                    <Link to="/" className="menu-item">
                        Played
      </Link>
                </div>
            </Menu>

        </div >
    );
};
