import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';

const mapStateToProps = ({ filters }) => ({
    filters
  });

const FilterInformationBar = ({ filters }) => {
    return (
        <div className="text-center filter-information no-filters">
            {filters.sport.length > 0 && filters.sport.map((sport) => {return <span>| Sport: {sport} |</span>})}
            {filters.date && <span>| Date: {moment(filters.date).format('D MMM')} |</span>}
            {filters.time.length > 0 && filters.time.map((time) => {return <span>| Time: {time} |</span>})}
            {filters.location.length > 0 && filters.location.map((location) => {return <span>| Location: {location} |</span>})}
        </div> 
    )
}

export default connect(
    mapStateToProps
)(FilterInformationBar);