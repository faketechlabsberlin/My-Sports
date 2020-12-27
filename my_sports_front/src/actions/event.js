import * as apiUtil from '../util/event';

export const CREATE_EVENT = 'CREATE_EVENT';
export const FIND_EVENTS = 'FIND_EVENTS';

export const createEvent = event => ({
  type: CREATE_EVENT,
  event
});

// export const createEvent = event => async dispatch => {
//   const response = await apiUtil.createEvent(event);
//   const data = await response.json();
// if (response.ok) {
//     return dispatch(createEvent(event));
//   }
//  // return dispatch(receiveErrors(data));
// };

export const findEvents = events => ({
  type: FIND_EVENTS,
  events
});

// export const findEvents = events => async dispatch => {
//   const response = await apiUtil.findEvents(events);
//   const data = await response.json();
// if (response.ok) {
//     return dispatch(createEvent(event));
//   }
// }