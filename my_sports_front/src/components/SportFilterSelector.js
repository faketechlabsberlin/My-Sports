import React from 'react'
import { connect } from "react-redux";
import basketball from '../images/sport-images/basketball.png';
import bouldering from '../images/sport-images/bouldering.png';
import football from '../images/sport-images/football.png';
import pingpong from '../images/sport-images/pingpong.png';
import running from '../images/sport-images/running.png';
import volleyball from '../images/sport-images/volleyball.png';
import yoga from '../images/sport-images/yoga.png';
import { filterBySport } from '../actions/filter';

const mapStateToProps = ({ filters }) => ({
    filters
  });

const mapDispatchToProps = dispatch => ({
    filterBySport: (payload) => dispatch(filterBySport(payload))
});

const SportFilterSelector = ({ filters, filterBySport, desktop }) => {

    const filterSport = (sport) => {
        if (!desktop) {
            const image = document.getElementById('add-fav-' + sport);
            if (image.getAttribute('class') === 'sport-image-select') {
                image.classList.remove('sport-image-select');
                filterBySport(sport)
            } else {
                image.classList.add('sport-image-select');
                filterBySport(sport)
            }
        } else {
            const image = document.getElementById('dadd-fav-' + sport);
            if (image.getAttribute('class') === 'sport-image-select') {
                image.classList.remove('sport-image-select');
                filterBySport(sport)
            } else {
                image.classList.add('sport-image-select');
                filterBySport(sport)
            }
        }
    }

    return (
        <div className="accordion-item">
            <h2 className="accordion-header filter-type-selector" id="flush-headingSport">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSport" aria-expanded="false" aria-controls="flush-collapseSport">
                By Sport {filters.sport.length > 0 && <span className="mx-auto filter-counter">{filters.sport.length}</span>}
            </button>
            </h2>
            <div id="flush-collapseSport" className="accordion-collapse collapse" aria-labelledby="flush-headingSport" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
                <div className="row cols-2 justify-content-space-between">
                    <div className="col pointer">
                        <img id={desktop + "add-fav-volleyball"} onClick={() => filterSport('volleyball')} src={volleyball}/>
                        <p className="sport-titles">Volleyball</p>
                    </div>
                    <div className="col pointer">
                        <img id={desktop + "add-fav-basketball"} onClick={() => filterSport('basketball')} src={basketball}/>
                        <p className="sport-titles">Basketball</p>
                    </div>
                </div>
                <div className="row cols-2 justify-content-space-between">
                    <div className="col pointer">
                        <img id={desktop + "add-fav-football"} onClick={() => filterSport('football')} src={football}/>
                        <p className="sport-titles">Football</p>
                    </div>
                    <div className="col pointer">
                        <img id={desktop + "add-fav-bouldering"} onClick={() => filterSport('bouldering')} src={bouldering}/>
                        <p className="sport-titles">Bouldering</p>
                    </div>
                </div>
                <div className="row cols-2 justify-content-space-between">
                    <div className="col pointer">
                        <img id={desktop + "add-fav-yoga"} onClick={() => filterSport('yoga')} src={yoga}/>
                        <p className="sport-titles">Yoga</p>
                    </div>
                    <div className="col pointer">
                        <img id={desktop + "add-fav-pingpong"} onClick={() => filterSport('pingpong')} src={pingpong}/>
                        <p className="sport-titles">Table Tennis</p>
                    </div>
                </div>
                <div className="row cols-2 justify-content-space-between">
                    <div className="col pointer">
                        <img id={desktop + "add-fav-running"} onClick={() => filterSport('running')} src={running}/>
                        <p className="sport-titles">Running</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SportFilterSelector);