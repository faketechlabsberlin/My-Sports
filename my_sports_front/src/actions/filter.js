export const FILTER_BY_SPORT = "FILTER_BY_SPORT";
export const FILTER_BY_MIN_SIZE = 'FILTER_BY_MIN_SIZE';
export const FILTER_BY_MAX_SIZE = 'FILTER_BY_MAX_SIZE';
export const FILTER_BY_MIN_SKILL = 'FILTER_BY_MIN_SKILL';
export const FILTER_BY_MAX_SKILL = 'FILTER_BY_MAX_SKILL';
export const FILTER_BY_DATE = 'FILTER_BY_DATE';
export const FILTER_BY_TIME = 'FILTER_BY_TIME';
export const FILTER_BY_NAME = 'FILTER_BY_NAME'

export const filterByName = payload => ({
   type: FILTER_BY_NAME,
   payload
});

export const filterBySport = payload => ({
   type: FILTER_BY_SPORT,
   payload
});

// export const filterBySportFunc = () => async dispatch => {
//    return dispatch(filterBySport(payload));
// }

// const filterByDate = payload => ({
//    type: FILTER_BY_DATE,
//    payload
// });

// export const filterByDateFunc = () => async dispatch => {
//    return dispatch(filterByDate(payload));
// }

// const filterByTime = payload => ({
//    type: FILTER_BY_TIME,
//    payload
// });

// export const filterByTimeFunc = () => async dispatch => {
//    return dispatch(filterByTime(payload));
// }

// const filterByMaxSize = payload => ({
//    type: FILTER_BY_MAX_SIZE,
//    payload
// });

// export const filterByMaxSizeFunc = () => async dispatch => {
//    return dispatch(filterByMaxSize(payload));
// }

// const filterByMinSize = payload => ({
//    type: FILTER_BY_MIN_SIZE,
//    payload
// });

// export const filterByMinSizeFunc = () => async dispatch => {
//    return dispatch(filterByMinSize(payload));
// }

// const filterByMaxSkill = payload => ({
//    type: FILTER_BY_MAX_SKILL,
//    payload
// });

// export const filterByMaxSkillFunc = () => async dispatch => {
//    return dispatch(filterByMaxSkill(payload));
// }

// const filterByMinSkill = payload => ({
//    type: FILTER_BY_MIN_SKILL,
//    payload
// });


// export const filterByMinSkillFunc = () => async dispatch => {
//    return dispatch(filterByMinSkill(payload));
// }