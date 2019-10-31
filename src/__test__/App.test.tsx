import React from "react";
import { shallow, mount } from "enzyme";
import { UnconnectedApp } from "../App";
import { MemoryRouter } from "react-router";
import { Helmet } from "react-helmet";
import { VIEWS } from "../controller/config";

describe("App", () => {
  it("should initially render with the correct title", () => {
    const wrapper = shallow(
      <UnconnectedApp
        pageTitle="Case Issue Navigator"
        setPageTitle={jest.fn()}
      />
    );
    expect(wrapper.find("title").text()).toEqual("Case Issue Navigator");
  });
  it("should show the correct title for Cases to Work", () => {
    mount(
      <MemoryRouter initialEntries={["/"]}>
        <UnconnectedApp
          pageTitle="Cases to Work | Case Issue Navigator"
          setPageTitle={jest.fn()}
        />
      </MemoryRouter>
    );
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Cases to Work | Case Issue Navigator");
  });
  it("should show the correct title for Snoozed Cases", () => {
    const setPageTitle = jest.fn();
    mount(
      <MemoryRouter initialEntries={["/snoozed-cases"]}>
        <UnconnectedApp
          pageTitle="Case Issue Navigator"
          setPageTitle={setPageTitle}
        />
      </MemoryRouter>
    );
    expect(setPageTitle).toHaveBeenCalledWith(
      `${VIEWS.SNOOZED_CASES.TITLE} | Case Issue Navigator`
    );
  });
});
