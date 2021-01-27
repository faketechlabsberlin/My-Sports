import { session } from 'passport';
import React, { useState } from 'react'
import SideBar from '../components/Side_Bar';
import { Link } from 'react-router-dom';




const Header = ({ title }) => {
    const [isFilterVisible, setIsFilterVisible] = useState()

    return (
        <div>
            <header id="App">
                <nav id="navbar">
                    <div className="menu">
                        <SideBar />
                    </div>
                    <h2 id="logo">MY SPORTS</h2>
                    <i className="material-icons-outlined md-36" id="filter-icon" onclick={() => setIsFilterVisible(true)}>filter_alt</i>
                    {isFilterVisible ? (
                        <div className="filter-header">
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    ) : null}
                </nav>
            </header>
        </div>
    );
}
export default Header;