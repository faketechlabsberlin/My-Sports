import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import moment from "moment";
import DateFilterSelector from "../../components/DateFilterSelector";
import { filters } from "../fixtures/filters";
import "../setupTests";

let startDate, wrapper;
const filterByDate = {
  type: "FILTER_BY_DATE",
  payload: {},
};

beforeEach(() => {
  startDate = jest.fn();
  wrapper = shallow(
    <Provider store={store}>
      <DateFilterSelector filterByDate={filterByDate} filters />
    </Provider>
  ).dive();
});

// test("should render date filter selector correctly", () => {
//   expect(wrapper).toMatchSnapshot();
// });

// test('should set start date to default moment', () => {

// });
