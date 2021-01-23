import { session } from 'passport';
import React from 'react';
import SideBar from '../components/Side_Bar';


const Header = ({ title }) => (

    <header id="App">
        <nav id="navbar">
            <div className="menu">
                <SideBar />
            </div>
            <h2 id="logo">MY SPORTS</h2>
            <i className="material-icons-outlined md-36" id="filter-icon">filter_alt</i>
        </nav>
    </header>

);

export default Header;