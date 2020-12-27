import { session } from 'passport';
import React from 'react';
import { NavLink } from 'react-router-dom'


const Header = () => (
    <header>
        <NavLink exact={true} to="/dashboard" activeClassName="is-active">Home</NavLink>
        <NavLink exact={true} to="/find-event" activeClassName="is-active">Find Event</NavLink>
        <NavLink exact={true} to={"/profile/" + session.userId} activeClassName="is-active">Profile</NavLink>
        <NavLink exact={true} to="/register" activeClassName="is-active">Register</NavLink>
    </header>
);

export default Header;