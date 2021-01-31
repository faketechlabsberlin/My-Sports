import React from 'react'
import { connect } from "react-redux";
import { filterByTime } from '../actions/filter';

const mapStateToProps = ({ filters }) => ({
    filters
  });

const mapDispatchToProps = dispatch => ({
    filterByTime: (payload) => dispatch(filterByTime(payload))
});

const TimeFilterSelector = ({ filterByTime, filters }) => {

    return (
        <div className="accordion-item">
            <h2 className="accordion-header filter-type-selector" id="flush-headingTime">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTime" aria-expanded="false" aria-controls="flush-collapseTime">
                By Time {filters.time.length > 0 && <span className="mx-auto filter-counter">{filters.time.length}</span>}
            </button>
            </h2>
            <div id="flush-collapseTime" className="accordion-collapse collapse" aria-labelledby="flush-headingTime" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
                <div className="form-check">
                    <input onChange={() => filterByTime('morning')} className="form-check-input pointer" type="checkbox" id="morning-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 yellow-label">label</i> <span className="time-label">Morning </span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByTime('afternoon')} className="form-check-input pointer" type="checkbox" id="afternoon-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 orange-label">label</i> <span className="time-label">Afternoon</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByTime('evening')} className="form-check-input pointer" type="checkbox" id="evening-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 blue-label">label</i> <span className="time-label">Evening</span>
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => filterByTime('night')} className="form-check-input pointer" type="checkbox" id="night-check" />
                    <label className="form-check-label">
                    <i className="material-icons md-24 dark-blue-label">label</i> <span className="time-label">Night</span>
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
)(TimeFilterSelector);