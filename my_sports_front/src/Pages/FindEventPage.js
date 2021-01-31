import React, { useEffect } from 'react'
import { connect } from "react-redux";
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import { getVisibleEvents } from '../util/helpers/filterHelpers';
import { resetFilters } from '../actions/filter';
import DesktopSideBar from '../components/DesktopSideBar';
import DesktopFilterBar from '../components/DesktopFilterBar';
import FilterInformationBar from '../components/FilterInformationBar';

const mapStateToProps = ({ event, filters, session }) => ({
    event,
    filters,
    session
})

const mapDispatchToProps = dispatch => ({
    resetFilters: () => dispatch(resetFilters())
});

const FindEventPage = ({ event, session, filters, resetFilters }) => {

    useEffect(() => {
        resetFilters();
      },[])

    const visibleEvents = getVisibleEvents(event, filters);
    const allOtherEvents = visibleEvents.filter(e => e.teammates.every(teammate => teammate._id !== session.userId) && e.size > e.teammates.length)

    return (
        <div className="silver-background white-background">
            <Header title={'MYSPORTS'} results={allOtherEvents.length}/>
            <FilterInformationBar />
            <div className="row justify-content-center m-0 p-0 container-fluid">
                <div className="desktop-sidebar col-3"><DesktopSideBar /></div>
                <div className="col-1 mobile-hide"></div>
                <div className="desktop-card-container col">
                    <div>
                        <div className="registration-top-space"></div>
                            {allOtherEvents.map((otherEvents) => {
                                return <EventCard event={otherEvents} />
                            })}
                    </div>
                </div>
                <div className="col-1 mobile-hide"></div>
                <div className="desktop-filterbar col-3"><DesktopFilterBar /></div>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FindEventPage);
