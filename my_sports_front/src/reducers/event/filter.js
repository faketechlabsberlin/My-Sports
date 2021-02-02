import { FILTER_BY_SPORT, FILTER_BY_NAME, FILTER_BY_DATE, FILTER_BY_TIME, FILTER_BY_MIN_SIZE, FILTER_BY_MAX_SIZE, FILTER_BY_MIN_SKILL, FILTER_BY_MAX_SKILL, FILTER_BY_LOCATION, RESET_FILTERS } from "../../actions/filter";

const filtersReducerDefaultState = {
    name: '',
    sport: [],
    date: '',
    time: [],
    location: [],
    minSize: 2,
    maxSize: 20,
    minSkill: 0,
    maxSkill: 5
  }

export default (state = filtersReducerDefaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RESET_FILTERS:
            return filtersReducerDefaultState;
        case FILTER_BY_SPORT:
            if (!state.sport.includes(action.payload)) {
                return {
                    ...state,
                    sport: state.sport.concat(action.payload)
                };
            } else {
                return {
                    ...state,
                    sport: state.sport.filter((s) => {return s !== action.payload})
                }
            }
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
            if (!state.time.includes(action.payload)) {
                return {
                    ...state,
                    time: state.time.concat(action.payload)
                };
            } else {
                return {
                    ...state,
                    time: state.time.filter((t) => {return t !== action.payload})
                }
            }
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
            if (!state.location.includes(action.payload)) {
                return {
                    ...state,
                    location: state.location.concat(action.payload)
                };
            } else {
                return {
                    ...state,
                    location: state.location.filter((l) => {return l !== action.payload})
                }
            }
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
