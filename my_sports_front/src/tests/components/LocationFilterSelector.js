import React from "react";
import { shallow } from "enzyme";
import LocationFilterSelector from "../../components/LocationFilterSelector";
import { filterByLocation } from "../../actions/filter";
import "../setupTests";

// test("should render location filer selector ", () => {
//   const wrapper = shallow(
//     <LocationFilterSelector filterByLocation={filterByLocation} filters />
//   );
//   expect(wrapper.debug()).toMatchSnapshot();
// });

test("should render Charlottenburg location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Charlottenburg-check").simulate("change");
  expect(wrapper.find("#Charlottenburg-check").prop("checked")).toBe(true);
});

test("should render Friedrichshain location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Friedrichshain-check").simulate("change");
});

test("should render Kreuzberg location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Kreuzberg-check").simulate("change");
});

test("should render Mitte location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Mitte-check").simulate("change");
});

test("should render Moabit location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Moabit-check").simulate("change");
});

test("should render Neukolln location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Neukolln-check").simulate("change");
});

test("should render Prenzlauer location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Prenzlauer-check").simulate("change");
});

test("should render Schoneberg location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Schoneberg-check").simulate("change");
});

test("should render Tempelhof location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Tempelhof-check").simulate("change");
});

test("should render Tiergarten location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Tiergarten-check").simulate("change");
});

test("should render Wilmersdorf location filter", () => {
  const wrapper = shallow(<LocationFilterSelector />);
  wrapper.find("#Wilmersdorf-check").simulate("change");
});
