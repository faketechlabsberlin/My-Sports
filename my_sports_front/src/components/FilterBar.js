import React, { useState } from 'react'
import { slide as Menu } from "react-burger-menu";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import filterIcon from '../images/filter_icon/filter_icon.svg';
import basketball from '../images/sport-images/basketball.png';
import bouldering from '../images/sport-images/bouldering.png';
import football from '../images/sport-images/football.png';
import pingpong from '../images/sport-images/pingpong.png';
import running from '../images/sport-images/running.png';
import volleyball from '../images/sport-images/volleyball.png';
import yoga from '../images/sport-images/yoga.png';
import { filterBySport, filterByDate, filterByTime, filterByMinSize, filterByMaxSize, filterByLocation, filterByMinSkill, filterByMaxSkill } from '../actions/filter';


const mapStateToProps = ({ filters }) => ({
    filters
})

const mapDispatchToProps = dispatch => ({
    filterBySport: (payload) => dispatch(filterBySport(payload)),
    filterByDate: (payload) => dispatch(filterByDate(payload)),
    filterByTime: (payload) => dispatch(filterByTime(payload)),
    filterByMinSize: (payload) => dispatch(filterByMinSize(payload)),
    filterByMaxSize: (payload) => dispatch(filterByMaxSize(payload)),
    filterByMinSkill: (payload) => dispatch(filterByMinSkill(payload)),
    filterByMaxSkill: (payload) => dispatch(filterByMaxSkill(payload)),
    filterByLocation: (payload) => dispatch(filterByLocation(payload))
});


const FilterBar = ({ filters, filterBySport, filterByDate, filterByTime, filterByMinSize, filterByMaxSize, filterByLocation, filterByMinSkill, filterByMaxSkill}) => {
    
    const [startDate, setStartDate] = useState(new Date());

    const filterSport = (sport) => {
        const image = document.getElementById('add-fav-' + sport);
        if (image.getAttribute('class') === 'sport-image-select') {
            image.classList.remove('sport-image-select');
            filterBySport('')
        } else {
            image.classList.add('sport-image-select');
            filterBySport(sport)
        }
    }

    const filterDate = (date) => {
        setStartDate(date)
        filterByDate(date);
    }

    const filterTime = (time) => {
        if (document.getElementById(`${time}-check`).checked) {
            filterByTime(time)
        } else {
            filterByTime('')
        }
    }

    const filterLocation = (location) => {
        if (document.getElementById(`${location}-check`).checked) {
            filterByLocation(location)
        } else {
            filterByLocation('')
        }
    }

    const addMinSize = () => {
        if (filters.minSize < filters.maxSize) {
            filterByMinSize(filters.minSize +1)
        }
    }

    const minusMinSize = () => {
        if (filters.minSize > 2) {
            filterByMinSize(filters.minSize -1)
        }
    }

    const addMaxSize = () => {
        if (filters.maxSize < 20) {
            filterByMaxSize(filters.maxSize +1)
    }
}

    const minusMaxSize = () => {
        if (filters.maxSize > filters.minSize) {
            filterByMaxSize(filters.maxSize -1)
    }
}

    const addMinSkill = () => {
        if (filters.minSkill < filters.maxSkill) {
            filterByMinSkill(filters.minSkill +1)
        }
    }

    const minusMinSkill = () => {
        if (filters.minSkill > 1) {
            filterByMinSkill(filters.minSkill -1)
        }
    }

    const addMaxSkill = () => {
        if (filters.maxSkill < 5) {
            filterByMaxSkill(filters.maxSkill +1)
        }
    }

    const minusMaxSkill = () => {
        if (filters.maxSkill > filters.minSkill) {
            filterByMaxSkill(filters.maxSkill -1)
        }
    }

    const removeAllFilters = () => {
        filterBySport('');
        filterByDate('');
        filterByTime('');
        filterByLocation('');
        filterByMinSize(2);
        filterByMaxSize(20);
        filterByMinSkill(1);
        filterByMaxSkill(5);
    }
    
    return (
        <div className="filter-bar-body">
            <Menu right customBurgerIcon={ <img src={filterIcon}/> }>
                <div className="filter-bar-head">
                    <p className="text-right filter-bar-head-text">3 Results</p>
                </div>
                <div className="filter-bar-content-menu">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingSport">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSport" aria-expanded="false" aria-controls="flush-collapseSport">
                                By Sport
                            </button>
                            </h2>
                            <div id="flush-collapseSport" class="accordion-collapse collapse" aria-labelledby="flush-headingSport" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div className="row cols-2 justify-content-space-between">
                                    <div className="col">
                                        <img id="add-fav-volleyball" onClick={() => filterSport('volleyball')} src={volleyball}/>
                                        <p className="sport-titles">Volleyball</p>
                                    </div>
                                    <div className="col">
                                        <img id="add-fav-basketball" onClick={() => filterSport('basketball')} src={basketball}/>
                                        <p className="sport-titles">Basketball</p>
                                    </div>
                                </div>
                                <div className="row cols-2 justify-content-space-between">
                                    <div className="col">
                                        <img id="add-fav-football" onClick={() => filterSport('football')} src={football}/>
                                        <p className="sport-titles">Football</p>
                                    </div>
                                    <div className="col">
                                        <img id="add-fav-bouldering" onClick={() => filterSport('bouldering')} src={bouldering}/>
                                        <p className="sport-titles">Bouldering</p>
                                    </div>
                                </div>
                                <div className="row cols-2 justify-content-space-between">
                                    <div className="col">
                                        <img id="add-fav-yoga" onClick={() => filterSport('yoga')} src={yoga}/>
                                        <p className="sport-titles">Yoga</p>
                                    </div>
                                    <div className="col">
                                        <img id="add-fav-pingpong" onClick={() => filterSport('pingpong')} src={pingpong}/>
                                        <p className="sport-titles">Table Tennis</p>
                                    </div>
                                </div>
                                <div className="row cols-2 justify-content-space-between">
                                    <div className="col">
                                        <img id="add-fav-running" onClick={() => filterSport('running')} src={running}/>
                                        <p className="sport-titles">Running</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingDate">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseDate" aria-expanded="false" aria-controls="flush-collapseDate">
                                By Date
                            </button>
                            </h2>
                            <div id="flush-collapseDate" class="accordion-collapse collapse" aria-labelledby="flush-headingDate" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <DatePicker
                                selected={startDate}
                                onChange={date => filterDate(date)}
                                inline
                                />
                                <p><button className="remove-date-filter-button" onClick={() => filterByDate('')}>Remove Date Filter</button></p>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTime">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTime" aria-expanded="false" aria-controls="flush-collapseTime">
                                By Time
                            </button>
                            </h2>
                            <div id="flush-collapseTime" class="accordion-collapse collapse" aria-labelledby="flush-headingTime" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div class="form-check">
                                    <input onChange={() => filterTime('morning')} class="form-check-input" type="checkbox" id="morning-check" />
                                    <label class="form-check-label" for="morning-check">
                                    <i className="material-icons md-24 yellow-label">label</i> <span className="time-label">Morning </span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterTime('afternoon')} class="form-check-input" type="checkbox" id="afternoon-check" />
                                    <label class="form-check-label" for="afternoon-check">
                                    <i className="material-icons md-24 orange-label">label</i> <span className="time-label">Afternoon</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterTime('evening')} class="form-check-input" type="checkbox" id="evening-check" />
                                    <label class="form-check-label" for="evening-check">
                                    <i className="material-icons md-24 blue-label">label</i> <span className="time-label">Evening</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterTime('night')} class="form-check-input" type="checkbox" id="night-check" />
                                    <label class="form-check-label" for="night-check">
                                    <i className="material-icons md-24 dark-blue-label">label</i> <span className="time-label">Night</span>
                                    </label>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingLocation">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseLocation" aria-expanded="false" aria-controls="flush-collapseLocation">
                                By Location
                            </button>
                            </h2>
                            <div id="flush-collapseLocation" class="accordion-collapse collapse" aria-labelledby="flush-headingLocation" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div class="form-check">
                                    <input onChange={() => filterLocation('Charlottenburg')} class="form-check-input" type="checkbox" id="Charlottenburg-check" />
                                    <label class="form-check-label" for="Charlottenburg-check">
                                    <i className="material-icons md-24 grey-icon">label</i> <span className="time-label">Charlottenburg </span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterLocation('Friedrichshain')} class="form-check-input" type="checkbox" id="Friedrichshain-check" />
                                    <label class="form-check-label" for="Friedrichshain-check">
                                    <i className="material-icons md-24 deep-blue-label">label</i> <span className="time-label">Friedrichshain</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterLocation('Kreuzberg')} class="form-check-input" type="checkbox" id="Kreuzberg-check" />
                                    <label class="form-check-label" for="Kreuzberg-check">
                                    <i className="material-icons md-24 sand-label">label</i> <span className="time-label">Kreuzberg</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterLocation('Mitte')} class="form-check-input" type="checkbox" id="Mitte-check" />
                                    <label class="form-check-label" for="Mitte-check">
                                    <i className="material-icons md-24 green-label">label</i> <span className="time-label">Mitte</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterLocation('Moabit')} class="form-check-input" type="checkbox" id="Moabit-check" />
                                    <label class="form-check-label" for="Moabit-check">
                                    <i className="material-icons md-24 orange-label">label</i> <span className="time-label">Moabit </span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterLocation('Neukolln')} class="form-check-input" type="checkbox" id="Neukolln-check" />
                                    <label class="form-check-label" for="Neukolln-check">
                                    <i className="material-icons md-24 red-label">label</i> <span className="time-label">Neukolln</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterTime('Prenzlauer-Berg')} class="form-check-input" type="checkbox" id="Prenzlauer-Berg-check" />
                                    <label class="form-check-label" for="Prenzlauer-Berg-check">
                                    <i className="material-icons md-24 teal-label">label</i> <span className="time-label">Prenzlauer-Berg</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterTime('Schoneberg')} class="form-check-input" type="checkbox" id="Schoneberg-check" />
                                    <label class="form-check-label" for="Schoneberg-check">
                                    <i className="material-icons md-24 purple-label">label</i> <span className="time-label">Schoneberg</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterTime('Tempelhof')} class="form-check-input" type="checkbox" id="Tempelhof-check" />
                                    <label class="form-check-label" for="Tempelhof-check">
                                    <i className="material-icons md-24 silver-label">label</i> <span className="time-label">Tempelhof </span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterTime('Tiergarten')} class="form-check-input" type="checkbox" id="Tiergarten-check" />
                                    <label class="form-check-label" for="Tiergarten-check">
                                    <i className="material-icons md-24 pink-label">label</i> <span className="time-label">Tiergarten</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input onChange={() => filterTime('Wilmersdorf')} class="form-check-input" type="checkbox" id="Wilmersdorf-check" />
                                    <label class="form-check-label" for="Wilmersdorf-check">
                                    <i className="material-icons md-24 dark-blue-label">label</i> <span className="time-label">Wilmersdorf</span>
                                    </label>
                                </div>                                                             
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingSize">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSize" aria-expanded="false" aria-controls="flush-collapseSize">
                                By Team Size
                            </button>
                            </h2>
                            <div id="flush-collapseSize" class="accordion-collapse collapse" aria-labelledby="flush-headingSize" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div>
                                    <p className="text-muted text-center">Miniumum amount of players</p>
                                    <div className="number-container"><i onClick={addMinSize} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_up</i></div>
                                    <div className="number-container">{filters.minSize}</div>
                                    <div className="number-container"><i onClick={minusMinSize} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_down</i></div>
                                </div>
                                <div>
                                    <p className="text-muted text-center">Maximum amount of players</p>
                                    <div className="number-container"><i onClick={addMaxSize} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_up</i></div>
                                    <div className="number-container">{filters.maxSize}</div>
                                    <div className="number-container"><i onClick={minusMaxSize} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_down</i></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingSkill">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSkill" aria-expanded="false" aria-controls="flush-collapseSkill">
                                By Skill Level
                            </button>
                            </h2>
                            <div id="flush-collapseSkill" class="accordion-collapse collapse" aria-labelledby="flush-headingSkill" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div>
                                    <p className="text-muted text-center">Miniumum skill level</p>
                                    <div className="number-container"><i onClick={addMinSkill} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_up</i></div>
                                    <div className="number-container">{filters.minSkill}</div>
                                    <div className="number-container"><i onClick={minusMinSkill} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_down</i></div>
                                </div>
                                <div>
                                    <p className="text-muted text-center">Maximum skill level</p>
                                    <div className="number-container"><i onClick={addMaxSkill} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_up</i></div>
                                    <div className="number-container">{filters.maxSkill}</div>
                                    <div className="number-container"><i onClick={minusMaxSkill} className="material-icons md-48 number-arrow pointer black-icon">keyboard_arrow_down</i></div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <p><button className="remove-all-filters-button" onClick={removeAllFilters}>Remove All Filters</button></p>
                </div>
            </Menu>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBar);
