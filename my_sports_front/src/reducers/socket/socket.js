import { TOGGLE_SOCKET } from "../../actions/socket";

const initialState = {
    toggle: false
}

export default (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case TOGGLE_SOCKET:
            return {
                ...initialState,
                toggle: !state.toggle
            }
        default:
            return state;
    }
};

//might not need