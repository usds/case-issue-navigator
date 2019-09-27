import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import { MemoryRouter } from "react-router";
import { Helmet } from "react-helmet";

describe("App", () => {
  it("should initially render with the correct title", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("title").text()).toEqual("Case Issue Navigator");
  });
  it("should show the correct title for Cases to Work", () => {
    mount(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Cases to Work | Case Issue Navigator");
  });
  it("should show the correct title for Snoozed Cases", () => {
    mount(
      <MemoryRouter initialEntries={["/snoozed-cases"]}>
        <App />
      </MemoryRouter>
    );
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Snoozed Cases | Case Issue Navigator");
  });
});
