import React from "react";
import { mount } from "enzyme";
import PrimaryNavMenu from "../PrimaryNavMenu";
import { store } from "../../../redux/create";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

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

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <PrimaryNavMenu views={views} />
    </MemoryRouter>
  </Provider>
);

describe("PrimaryNavMenu", () => {
  it("should render the correct number of links", () => {
    expect(wrapper.find("NavLink").length).toBe(3);
  });
});
