import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { filterByName, filterBySport } from '../actions/filter';

const getVisibleEvents = (events, filters) => {
    return events.filter((event) => {
      const nameMatch = event.title.toLowerCase().includes(filters.name.toLowerCase());
      const sportMatch = event.sport.toLowerCase().includes(filters.sport.toLowerCase());
      return nameMatch && sportMatch;
    });
  };
  

const mapStateToProps = ({ event, filters }) => ({
    event,
    filters
})

const mapDispatchToProps = dispatch => ({
    filterByName: (payload) => dispatch(filterByName(payload)),
    filterBySport: (payload) => dispatch(filterBySport(payload))
});

const FindEventPage = ({ event, filters, filterByName, filterBySport }) => {

    const visibleEvents = getVisibleEvents(event, filters);

    const filterByInput = (e) => {
        let input = e.target.value;
        filterByName({ value: input })
    }

    const filterFootball = () => {
        filterBySport('football')
    }

    const filterBasketball = () => {
        filterBySport('basketball')
    }

    const filterVolleyball = () => {
        filterBySport('beach volleyball')
    }

    const filterNone = () => {
        filterBySport('')
    }

    return (
        <div>
            <p>What are you looking for?</p>
            <div>
                <label htmlFor="filter-by-title">Search for specific Event by Title:</label>
                <input type="search" id="filter-by-title" placeholder="Search" onChange={e => {filterByInput(e)}}></input>
            </div>
            <h4>Or apply filters below.</h4>
            <p>What sport do you want to play?</p>
            <button onClick={filterFootball}>Football</button>   <button onClick={filterBasketball}>Basketball</button>   <button onClick={filterVolleyball}>Beach Volleyball</button>   <button onClick={filterNone}>All Events</button>
            <p>
                <label htmlFor="date-filter">Which day would you like to play?</label>
                <input type="date" id="date-filter" min="2020-12-12"></input>
            </p>
            {visibleEvents.map((e) => {
                return <p key={e._id}><Link to={'/event/' + e._id}>{e.title}</Link></p>
            })}
            <p>Didn't find what you were looking for? <Link to="/create-event">Create your own event!</Link></p>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FindEventPage);
