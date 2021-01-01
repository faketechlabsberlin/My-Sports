import { FILTER_BY_SPORT, FILTER_BY_NAME, FILTER_BY_DATE, FILTER_BY_TIME, FILTER_BY_MIN_SIZE, FILTER_BY_MAX_SIZE, FILTER_BY_MIN_SKILL, FILTER_BY_MAX_SKILL } from "../../actions/filter";

const filtersReducerDefaultState = {
    name: '',
    sport: ''
  }

export default (state = filtersReducerDefaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case FILTER_BY_SPORT:
            return {
                ...state,
                sport: action.payload
            };
        case FILTER_BY_DATE:
            //filter by date
            return state;
        case FILTER_BY_NAME:
            return {
                ...state,
                name: action.payload.value
            };
        case FILTER_BY_TIME:
           //filter by TIME
           return state;
        case FILTER_BY_MIN_SIZE:
           //filter by min size
           return state;
        case FILTER_BY_MAX_SIZE:
            //filter by max size
            return state;
        case FILTER_BY_MIN_SKILL:
            //filter by min skill
            return state;
        case FILTER_BY_MAX_SKILL:
           //filter by max skill
           return state;
        default:
           return state;
   }
};
