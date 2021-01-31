import React from 'react';
import { connect } from "react-redux";
import { filterByMinSize, filterByMaxSize, filterByMinSkill, filterByMaxSkill } from '../actions/filter';

const mapStateToProps = ({ filters }) => ({
    filters
})

const mapDispatchToProps = dispatch => ({
    filterByMinSize: (payload) => dispatch(filterByMinSize(payload)),
    filterByMaxSize: (payload) => dispatch(filterByMaxSize(payload)),
    filterByMinSkill: (payload) => dispatch(filterByMinSkill(payload)),
    filterByMaxSkill: (payload) => dispatch(filterByMaxSkill(payload))
});

const SizeAndSkillFilterSelector = ({ filters, filterByMinSize, filterByMaxSize, filterByMinSkill, filterByMaxSkill }) => {

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

    return (
        <div>
            <div className="accordion-item">
                <h2 className="accordion-header filter-type-selector" id="flush-headingSize">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSize" aria-expanded="false" aria-controls="flush-collapseSize">
                    By Team Size
                </button>
                </h2>
                <div id="flush-collapseSize" className="accordion-collapse collapse" aria-labelledby="flush-headingSize" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
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
            <div className="accordion-item">
                <h2 className="accordion-header filter-type-selector" id="flush-headingSkill">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSkill" aria-expanded="false" aria-controls="flush-collapseSkill">
                    By Skill Level
                </button>
                </h2>
                <div id="flush-collapseSkill" className="accordion-collapse collapse" aria-labelledby="flush-headingSkill" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
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
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SizeAndSkillFilterSelector);