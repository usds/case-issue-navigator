import React from "react";
import { shallow, mount } from "enzyme";
import App, { UnconnectedApp } from "../App";
import { MemoryRouter } from "react-router";
import { Helmet } from "react-helmet";
import { VIEWS } from "../controller/config";
import { createStore } from "redux";
import { rootReducer } from "../redux/create";
import { Provider } from "react-redux";

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
  it("should connect to the store", () => {
    const store = createStore(rootReducer);
    mount(
      <MemoryRouter initialEntries={["/snoozed-cases"]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual(
      `${VIEWS.SNOOZED_CASES.TITLE} | Case Issue Navigator`
    );
  });
});
