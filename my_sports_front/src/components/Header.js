import React from 'react';
import SideBar from '../components/SideBar';
import FilterBar from '../components/FilterBar';

const Header = ({ title, results }) => {
 
    return (
            <header>
                <nav id="navbar">
                    <div className="menu">
                        <SideBar />
                    </div>
                    <h2 id="logo">{title}</h2>
                    <div className="filter-bar">
                        <FilterBar results={results || 0} />
                    </div>
                </nav>
            </header>
    );
}
export default Header;