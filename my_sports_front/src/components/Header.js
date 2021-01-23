import { session } from 'passport';
import React from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../components/Side_Bar';


const Header = () => (
    /*   <header>
          <NavLink exact={true} to="/dashboard" activeClassName="is-active">Home</NavLink>
          <NavLink exact={true} to="/find-event" activeClassName="is-active">Find Event</NavLink>
          <NavLink exact={true} to={"/profile/" + session.userId} activeClassName="is-active">Profile</NavLink>
          <NavLink exact={true} to="/register" activeClassName="is-active">Register</NavLink>
      </header> */

    <div id="App">
        <nav id="navbar">
            <div className="menu">
                <SideBar />
            </div>
            <h2 id="logo">MY SPORTS</h2>
            <span class="material-icons" id="filter-icon">filter_alt</span>
        </nav>
    </div>

);

export default Header;