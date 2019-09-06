import React from "react";
import { shallow } from "enzyme";
import PrimaryNavMenu from "../PrimaryNavMenu";

const VIEWS = {
  CASES_TO_WORK: {
    ROUTE: "",
    TITLE: "Cases to Work"
  },
  SNOOZED_CASES: {
    ROUTE: "snoozed-cases",
    TITLE: "Snoozed Cases"
  },
  SOMETHING_ELSE: {
    ROUTE: "something-else",
    TITLE: "Something Else"
  }
};
const views = VIEWS;
const summary = {
  CASES_TO_WORK: 30,
  SNOOZED_CASES: 10,
  SOMETHING_ELSE: 1
};
const title = "Nav test";
const wrapper = shallow(<PrimaryNavMenu {...{ views, summary, title }} />);

describe("PrimaryNavMenu", () => {
  it("should render the correct number of links", () => {
    expect(wrapper.find("NavLink").length).toBe(3);
  });
});
