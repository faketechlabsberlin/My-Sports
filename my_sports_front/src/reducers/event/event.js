import { CREATE_EVENT, DELETE_EVENT, FETCH_ALL, FILTER_BY_NAME } from "../../actions/event";

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE_EVENT:
            return state.concat(action.payload)
        case DELETE_EVENT:
            return state.filter(element => element !== action.payload);
        default:
            return state;
    }
};

// export const createEvent = state => state.upcomingEvents;
// export const findEvents = state => state.availableEvents;