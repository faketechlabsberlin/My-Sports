import { FILTER_BY_SPORT, FILTER_BY_NAME, FILTER_BY_DATE, FILTER_BY_TIME, FILTER_BY_MIN_SIZE, FILTER_BY_MAX_SIZE, FILTER_BY_MIN_SKILL, FILTER_BY_MAX_SKILL, FILTER_BY_LOCATION, RESET_FILTERS } from "../../actions/filter";

const filtersReducerDefaultState = {
    name: '',
    sport: '',
    date: '',
    time: '',
    location: '',
    minSize: 2,
    maxSize: 20,
    minSkill: 1,
    maxSkill: 5
  }

export default (state = filtersReducerDefaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RESET_FILTERS:
            return filtersReducerDefaultState;
        case FILTER_BY_SPORT:
            return {
                ...state,
                sport: action.payload
            };
        case FILTER_BY_DATE:
            return {
                ...state,
                date: action.payload
            };
        case FILTER_BY_NAME:
            return {
                ...state,
                name: action.payload.value
            };
        case FILTER_BY_TIME:
            return {
                ...state,
                time: action.payload
            };
        case FILTER_BY_MIN_SIZE:
            return {
                ...state,
                minSize: action.payload
            };
        case FILTER_BY_MAX_SIZE:
            return {
                ...state,
                maxSize: action.payload
            };
        case FILTER_BY_LOCATION:
            return {
                ...state,
                location: action.payload
            };
        case FILTER_BY_MIN_SKILL:
            return {
                ...state,
                minSkill: action.payload
            };
        case FILTER_BY_MAX_SKILL:
            return {
                ...state,
                maxSkill: action.payload
            };
        default:
           return state;
   }
};
