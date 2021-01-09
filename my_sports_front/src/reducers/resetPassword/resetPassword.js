import { GET_USERNAME, TOGGLE_CODE_OK, UPDATE_SUCCESS_TOGGLE } from "../../actions/resetPassword";

const initialState = {
    passwordToggle: false,
    username: '',
    updated: false
}

export default (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case TOGGLE_CODE_OK:
            return {
                ...state,
                passwordToggle: !state.passwordToggle
            }
        case GET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case UPDATE_SUCCESS_TOGGLE:
            return {
                ...state,
                updated: !state.updated
            }
        default:
            return state;
    }
};
