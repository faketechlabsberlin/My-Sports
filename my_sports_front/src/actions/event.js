import * as apiUtil from '../util/event';

export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const FETCH_ALL = 'FETCH_ALL';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';

const createEvent = event => ({
  type: CREATE_EVENT,
  payload: event
});

export const createEventFunc = event => async dispatch => {
  // const response = await apiUtil.createEvent(event);
  // const data = await response.json();
  //   if (response.ok) {
      return dispatch(createEvent(event));
    // }
 // return dispatch(receiveErrors(data));
};

// export const findEvents = events => ({
//   type: FIND_EVENTS,
//   events
// }); 

export const deleteEvent = event => ({
  type: DELETE_EVENT,
  event
});

const getAllEvents = (response) => ({
  type: FETCH_ALL,
  payload: response
})

export const getEvents = () => async dispatch => {
  const response = await apiUtil.getAllEvents();
  return dispatch(getAllEvents(response));
}

export const filterByName = payload => ({
  type: FILTER_BY_NAME,
  payload
});