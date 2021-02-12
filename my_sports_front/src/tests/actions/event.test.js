import { createEvent, getEvents } from "../../actions/event";
import * as apiUtil from "../../util/event";

test("should setup create event object", () => {
  const action = createEvent();
  expect(action).toEqual({
    type: "CREATE_EVENT",
    payload: undefined,
  });
});

test("should setup create event object", () => {
  const action = createEvent({ eventName: "football nights" });
  expect(action).toEqual({
    type: "CREATE_EVENT",
    payload: { eventName: "football nights" },
  });
});

// test("should setup get event object", () => {
//   const action = getEvents({});
//   expect(action).toEqual({
//     type: "FETCH_ALL",
//     payload: {},
//   });
// });
