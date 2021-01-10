import { CREATE_EVENT, DELETE_EVENT, FETCH_ALL } from "../../actions/event";

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE_EVENT:
            return [...state, action.payload]
        case DELETE_EVENT:
            return state.filter(element => element !== action.payload);
        default:
            return state;
    }
};
