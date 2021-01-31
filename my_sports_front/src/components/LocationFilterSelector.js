import React from 'react';
import { connect } from "react-redux";
import { filterByLocation } from '../actions/filter';

const mapStateToProps = ({ filters }) => ({
    filters
  });

const mapDispatchToProps = dispatch => ({
    filterByLocation: (payload) => dispatch(filterByLocation(payload))
});

const LocationFilterSelector = ({ filterByLocation, filters }) => {
    return ( 
        <div className="accordion-item">
            <h2 className="accordion-header filter-type-selector" id="flush-headingLocation">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseLocation" aria-expanded="false" aria-controls="flush-collapseLocation">
                By Location {filters.location.length > 0 && <span className="mx-auto filter-counter">{filters.location.length}</span>}
            </button>
            </h2>
            <div id="flush-collapseLocation" className="accordion-collapse collapse" aria-labelledby="flush-headingLocation" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
                <div className="form-check">
                    <input onChange={() => filterByLocation('Charlottenburg')} className="form-check-input" type="checkbox" id="Charlottenburg-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 grey-icon">label</i> <span className="time-label">Charlottenburg </span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Friedrichshain')} className="form-check-input" type="checkbox" id="Friedrichshain-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 deep-blue-label">label</i> <span className="time-label">Friedrichshain</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Kreuzberg')} className="form-check-input" type="checkbox" id="Kreuzberg-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 sand-label">label</i> <span className="time-label">Kreuzberg</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Mitte')} className="form-check-input" type="checkbox" id="Mitte-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 green-label">label</i> <span className="time-label">Mitte</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Moabit')} className="form-check-input" type="checkbox" id="Moabit-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 orange-label">label</i> <span className="time-label">Moabit </span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Neukolln')} className="form-check-input" type="checkbox" id="Neukolln-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 red-label">label</i> <span className="time-label">Neukolln</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Prenzlauer-Berg')} className="form-check-input" type="checkbox" id="Prenzlauer-Berg-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 teal-label">label</i> <span className="time-label">Prenzlauer-Berg</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Schoneberg')} className="form-check-input" type="checkbox" id="Schoneberg-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 purple-label">label</i> <span className="time-label">Schoneberg</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Tempelhof')} className="form-check-input" type="checkbox" id="Tempelhof-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 silver-label">label</i> <span className="time-label">Tempelhof </span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Tiergarten')} className="form-check-input" type="checkbox" id="Tiergarten-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 pink-label">label</i> <span className="time-label">Tiergarten</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByLocation('Wilmersdorf')} className="form-check-input" type="checkbox" id="Wilmersdorf-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 dark-blue-label">label</i> <span className="time-label">Wilmersdorf</span>
                    </label>
                </div>                                                             
            </div>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationFilterSelector);