import { CREATE_EVENT, FIND_EVENTS } from "../../actions/event";

export default (state = {
    availableEvents = [],
    upcomingEvents = [],
    pastEvents = []
    }, { type, event, events }) => {
    Object.freeze(state);
    switch (type) {
        case CREATE_EVENT:
            return [...upcomingEvents, event];
        case FIND_EVENTS:
            return [...availableEvents, ...events];
        default:
            return state;
    }
};

export const createEvent = state => state.upcomingEvents;
export const findEvents = state => state.availableEvents;