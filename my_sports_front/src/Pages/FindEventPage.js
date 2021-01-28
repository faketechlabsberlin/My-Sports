import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { filterByName, filterBySport, filterByDate, filterByTime, filterByMinSize, filterByMaxSize, filterByLocation, filterByMinSkill, filterByMaxSkill } from '../actions/filter';
import Header from '../components/Header';
import moment from 'moment';
import StarRatings from 'react-star-ratings';


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
        return nameMatch && sportMatch && dateMatch && timeMatch && locationMatch && sizeMatch && skillMatch;
    });
};


const mapStateToProps = ({ event, filters, session }) => ({
    event,
    filters,
    session
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

const FindEventPage = ({ event, session, filters }) => {

    const visibleEvents = getVisibleEvents(event, filters);

    return (
        <div>
            <Header title={'MYSPORTS'} />
            <p className="text-center filter-bar no-filters">No filters selected</p>
            <div id="dashboard-background" className="silver-background container-fluid">
            {visibleEvents.filter(e => e.teammates.every(teammate => teammate._id !== session.userId)).map((otherEvents) => {
                return <div className="form-box-white thick-bottom-border">
                <div className="card" style={{width: 100 + '%'}}>
                <div className="card-body">
                  <h3 className="event-page-event-title card-title">{otherEvents.title}</h3>
                  <div className={`bottom-border-color-${otherEvents.sport} row justify-content-space-between`}>
                    <div className="col">
                      <p className="card-text text-muted">{moment(otherEvents.date).format("dddd, MMM Do")}</p>
                      <p className="card-text text-muted">{otherEvents.location}</p>
                      {otherEvents.court &&  <p className="card-text text-muted">{otherEvents.court}</p>}
                    </div>
                      <div className="col">
                        <img className="event-page-sport-image" src={`../images/sport-images/${otherEvents.sport}.png`} />
                      </div>
                  </div>
                  <div className="row">
                    <p id="dashboard-player" className="col card-text text-muted player-count-text">Players: <span className="error-text">{otherEvents.teammates.length}/{otherEvents.size}</span></p>
                    <p id="dashboard-stars" className="col dashboard-stars"><StarRatings
                        rating={otherEvents.skill / otherEvents.teammates.length}
                        starRatedColor="#E9B467"
                        numberOfStars={5}
                        starDimension="1.2em"
                        starSpacing="0.7px"
                        /></p>
                  </div>
                  <div className="accordion" id={"accordionExample" + otherEvents._id}>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id={"heading" + otherEvents._id}>
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + otherEvents._id} aria-expanded="true" aria-controls={"collapse"+ otherEvents._id}>
                          </button>
                        </h2>
                        <div id={"collapse"+ otherEvents._id} className="accordion-collapse collapse" aria-labelledby={"heading"+ otherEvents._id} data-bs-parent={"#accordionExample"+ otherEvents._id}>
                          <div className="accordion-body">
                            <div><button className="edit-event-button"><Link className="edit-event-link" to={"/event/" + otherEvents._id}>View Event</Link></button></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
            })}
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FindEventPage);
