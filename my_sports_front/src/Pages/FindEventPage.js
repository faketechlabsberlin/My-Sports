import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { filterByName, filterBySport, filterByDate, filterByTime, filterByMinSize, filterByMaxSize, filterByLocation, filterByMinSkill, filterByMaxSkill } from '../actions/filter';

const getVisibleEvents = (events, filters) => {
    return events.filter((event) => {
      const nameMatch = event.title.toLowerCase().includes(filters.name.toLowerCase());
      const sportMatch = event.sport.includes(filters.sport);
      const dateMatch = event.date.slice(0, 10).includes(filters.date);
      const timeMatch = event.time.includes(filters.time);
      const locationMatch = event.location.includes(filters.location);
      let sizeMatch = true;
      if (event.size < filters.minSize) {
          sizeMatch = false
      }
      if (event.size > filters.maxSize) {
          sizeMatch = false
      }
      let skillMatch = true;
      if (event.skill < filters.minSkill) {
          skillMatch = false
        }
      if (event.skill > filters.maxSkill) {
          skillMatch = false
    }
      return nameMatch && sportMatch && dateMatch && timeMatch && locationMatch && sizeMatch;
    });
  };
  

const mapStateToProps = ({ event, filters }) => ({
    event,
    filters
})

const mapDispatchToProps = dispatch => ({
    filterByName: (payload) => dispatch(filterByName(payload)),
    filterBySport: (payload) => dispatch(filterBySport(payload)),
    filterByDate: (payload) => dispatch(filterByDate(payload)),
    filterByTime: (payload) => dispatch(filterByTime(payload)),
    filterByMinSize: (payload) => dispatch(filterByMinSize(payload)),
    filterByMaxSize: (payload) => dispatch(filterByMaxSize(payload)),
    filterByMinSkill: (payload) => dispatch(filterByMinSkill(payload)),
    filterByMaxSkill: (payload) => dispatch(filterByMaxSkill(payload)),
    filterByLocation: (payload) => dispatch(filterByLocation(payload))
});

const FindEventPage = ({ event, filters, filterByName, filterBySport, filterByDate, filterByTime, filterByMinSize, filterByMaxSize, filterByLocation, filterByMinSkill, filterByMaxSkill }) => {

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

    const filterDate = (e) => {
        e.preventDefault();
        const input = e.target.date.value
        filterByDate(input);
    }

    const filterTime = (e) => {
        e.preventDefault();
        const input = e.target.time.value
        filterByTime(input);
    }

    const filterLocation = (e) => {
        e.preventDefault();
        const input = e.target.location.value
        filterByLocation(input);
    }

    const filterMinSize = (e) => {
        e.preventDefault();
        const input = e.target.value
        filterByMinSize(input);
    }

    const filterMaxSize = (e) => {
        e.preventDefault();
        const input = e.target.value
        filterByMaxSize(input);
    }

    const filterMinSkill = (e) => {
        e.preventDefault();
        const input = e.target.value
        filterByMinSkill(input);
    }

    const filterMaxSkill = (e) => {
        e.preventDefault();
        const input = e.target.value
        filterByMaxSkill(input);
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
            <div>
                <form onSubmit={e => {filterDate(e)}}>
                    <label htmlFor="date-filter">Which day would you like to play?</label>
                    <input type="date" id="date-filter" min="2020-12-12" name="date"></input>
                    <button>Filter!</button>
                </form>
                <form onSubmit={e => {filterTime(e)}}>
                    <label htmlFor="time-filter">Prefer a specific time of the day?</label>
                    <select id="time-filter" name="time">
                        <option value="">Any time works for me!</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="night">Night</option>
                    </select>
                    <button>Filter!</button>
                </form>
                <form onSubmit={e => {filterLocation(e)}}>
                    <label htmlFor="location-filter">Which neighbourhood are you looking to play in?</label>
                    <select id="location-filter" name="location">
                        <option value="">Doesn't matter!</option>
                        <option value="friedrichshain">Friedrichshain</option>
                        <option value="neukolln">Neukolln</option>
                        <option value="kreuzburg">Kreuzburg</option>
                        <option value="prenzlaur burg">Prenzlaur Burg</option>
                    </select>
                    <button>Filter!</button>
                </form>
                <p>
                    <label htmlFor="min-size">Minimum amount of teammates</label>
                    <input onChange={e => {filterMinSize(e)}} id="min-size" type="number" name="min-size" min="2" max="20" value={filters.minSize}></input>
                    <label htmlFor="max-size">Maximum amount of teammates</label>
                    <input onChange={e => {filterMaxSize(e)}} id="min-size" type="number" name="max-size" min="2" max="20" value={filters.maxSize}></input>
                </p>
                <p>
                    <label htmlFor="min-skill">Minimum skill level:</label>
                    <input onChange={e => {filterMinSkill(e)}} id="min-skill" type="number" name="min-skill" min="1" max="5" value={filters.minSkill}></input>
                    <label htmlFor="max-skill">Maximum skill level:</label>
                    <input onChange={e => {filterMaxSkill(e)}} id="min-skill" type="number" name="max-skill" min="1" max="5" value={filters.maxSkill}></input>
                </p>
            </div>
            {visibleEvents && visibleEvents.map((e) => {
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
