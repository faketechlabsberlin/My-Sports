import React from 'react';
import SideBar from '../components/SideBar';
import FilterBar from '../components/FilterBar';

const Header = ({ title }) => {
 
    return (
            <header>
                <nav id="navbar">
                    <div className="menu">
                        <SideBar />
                    </div>
                    <h2 id="logo">{title}</h2>
                    {/*<i onClick={() => setIsFilterBarVisible(!isFilterBarVisible)} className="material-icons-outlined md-36" id="filter-icon">filter_alt</i>*/}
                    <div className="filter-bar">
                        <FilterBar />
                    </div>
                </nav>
            </header>
    );
}
export default Header;