import React from 'react';
import { connect } from "react-redux";
import { stack as Menu } from "react-burger-menu";
import filterIcon from '../images/filter_icon/filter_icon.svg';
import SportFilterSelector from '../components/SportFilterSelector';
import DateFilterSelector from './DateFilterSelector';
import TimeFilterSelector from '../components/TimeFilterSelector';
import LocationFilterSelector from '../components/LocationFilterSelector';
import SizeAndSkillFilterSelector from '../components/SizeAndSkillFilterSelector';
import { resetFilters } from '../actions/filter';

const mapDispatchToProps = dispatch => ({
    resetFilters: () => dispatch(resetFilters())
});

const FilterBar = ({ resetFilters, results }) => {
    
    return (
        <div className="filter-bar-body">
            <Menu right customBurgerIcon={ <img src={filterIcon}/> }>
                <div className="filter-bar-head">
                    <p className="text-right filter-bar-head-text">{results} Results</p>
                </div>
                <div className="filter-bar-content-menu">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <SportFilterSelector desktop={''}/>
                        <DateFilterSelector />
                        <TimeFilterSelector />
                        <LocationFilterSelector />
                        <SizeAndSkillFilterSelector />
                    </div>
                    <p className="text-center text-muted mt-5 mx-2">Please use the tabs above to select and deselect filters</p>
                </div>
            </Menu>
        </div>
    )
}

export default connect(
    null,
    mapDispatchToProps
)(FilterBar);