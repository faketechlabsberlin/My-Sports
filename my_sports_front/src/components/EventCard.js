import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import StarRatings from 'react-star-ratings';

export default function EventCard({ event }) {
    return (
        <div className="form-box-white thick-bottom-border">
            <div className="card" style={{width: 100 + '%'}}>
                <div className="card-body">
                    <h3 className="event-page-event-title card-title">{event.title}</h3>
                    <div className={`bottom-border-color-${event.sport} row justify-content-space-between`}>
                        <div className="col">
                            <p className="card-text text-muted">{moment(event.date).format("dddd, MMM Do")}</p>
                            <p className="card-text text-muted">{event.location}</p>
                            {event.court &&  <p className="card-text text-muted">{event.court}</p>}
                        </div>
                            <div className="col">
                            <img className="event-page-sport-image" src={`../images/sport-images/${event.sport}.png`} />
                        </div>
                    </div>
                    <div className="row">
                        <p id="dashboard-player" className="col card-text text-muted player-count-text">Players: <span className="error-text">{event.teammates.length}/{event.size}</span></p>
                        <p id="dashboard-stars" className="col dashboard-stars"><StarRatings
                            rating={event.skill / event.teammates.length}
                            starRatedColor="#E9B467"
                            numberOfStars={5}
                            starDimension="1.2em"
                            starSpacing="0.7px"
                            /></p>
                    </div>
                    <div className="accordion" id={"accordionExample" + event._id}>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={"heading" + event._id}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + event._id} aria-expanded="true" aria-controls={"collapse"+ event._id}></button>
                            </h2>
                            <div id={"collapse"+ event._id} className="accordion-collapse collapse" aria-labelledby={"heading"+ event._id} data-bs-parent={"#accordionExample"+ event._id}>
                                <div className="accordion-body">
                                    <div className="row justify-content-center"><button className="edit-event-button"><Link className="edit-event-link" to={"/event/" + event._id}>View Event</Link></button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
