import { CLEAR_MESSAGES, FETCH_MESSAGES, SAVE_MESSAGE } from "../../actions/message";

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case FETCH_MESSAGES:
            return [...state, ...action.payload]
        case SAVE_MESSAGE:
            return [...state, action.payload]
        case CLEAR_MESSAGES:
            return []
        default:
            return state;
    }
};
