export const TOGGLE_CODE_OK = 'TOGGLE_CODE_OK';
export const GET_USERNAME = 'GET_USERNAME';
export const UPDATE_SUCCESS_TOGGLE = 'UPDATE_SUCCESS_TOGGLE'

export const toggleCodeOk = () => ({
    type: TOGGLE_CODE_OK
});

export const getUsername = (payload) => ({
    type: GET_USERNAME,
    payload
});

export const updateSuccessToggle = () => ({
    type: GET_USERNAME
});