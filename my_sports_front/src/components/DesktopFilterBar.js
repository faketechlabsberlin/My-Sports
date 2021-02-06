import React from 'react';
import { connect } from "react-redux";
import { filterByName, resetFilters } from '../actions/filter';
import SportFilterSelector from '../components/SportFilterSelector';
import DateFilterSelector from '../components/DateFilterSelector';
import TimeFilterSelector from '../components/TimeFilterSelector';
import LocationFilterSelector from '../components/LocationFilterSelector';
import SizeAndSkillFilterSelector from '../components/SizeAndSkillFilterSelector';


const mapDispatchToProps = dispatch => ({
    filterByName: (payload) => dispatch(filterByName(payload)),
    resetFilters: () => dispatch(resetFilters())
});


const DesktopFilterBar = ({ filterByName, resetFilters }) => {

    const filterByInput = (e) => {
        let input = e.target.value;
        filterByName({ value: input })
    }
    
    return (
        <div>
            <div className="filter-bar-head">
                <div>
                    <form className="desktop-side-bar-search-form row justify-content-between">
                        <input onChange={e => { filterByInput(e) }} type="text" className="side-bar-search-input" placeholder="Search for event name" required/><button disabled className="desktop-side-bar-search-button"><i className="pointer material-icons md-24 grey-icon">search</i></button>
                    </form>
                </div>
            </div>
            <div className="filter-bar-content-menu">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <SportFilterSelector desktop={'d'} />
                    <DateFilterSelector />
                    <TimeFilterSelector />
                    <LocationFilterSelector />
                    <SizeAndSkillFilterSelector />
                </div>
                <p className="text-center text-muted mt-5 mx-2">Please use the tabs above to select and deselect filters</p>
            </div>
        </div>
    )
}

export default connect(
    null,
    mapDispatchToProps
)(DesktopFilterBar);