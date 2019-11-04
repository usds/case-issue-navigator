import React from "react";
import { mount } from "enzyme";
import App, { UnconnectedApp } from "../App";
import { MemoryRouter } from "react-router";
import { Helmet } from "react-helmet";
import { VIEWS } from "../controller/config";
import { store } from "../redux/create";
import { Provider } from "react-redux";
import { appStatusActionCreators } from "../redux/modules/appStatus";

describe("App", () => {
  beforeEach(() => {
    store.dispatch(appStatusActionCreators.clearUser());
  });
  it("should show the correct title for Cases to Work", () => {
    const setPageTitle = jest.fn();
    store.dispatch(appStatusActionCreators.setUser("Fred"));
    mount(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <UnconnectedApp
            pageTitle="Case Issue Navigator"
            setPageTitle={setPageTitle}
            clearCases={jest.fn()}
            lastUpdated="July 15, 2019"
          />
        </Provider>
      </MemoryRouter>
    );

    expect(setPageTitle).toHaveBeenCalledWith(
      `${VIEWS.CASES_TO_WORK.TITLE} | Case Issue Navigator`
    );
  });
  it("should show the correct title for Snoozed Cases", () => {
    const setPageTitle = jest.fn();
    store.dispatch(appStatusActionCreators.setUser("Fred"));
    mount(
      <MemoryRouter initialEntries={["/snoozed-cases"]}>
        <Provider store={store}>
          <UnconnectedApp
            pageTitle="Case Issue Navigator"
            setPageTitle={setPageTitle}
            clearCases={jest.fn()}
            lastUpdated="July 15, 2019"
          />
        </Provider>
      </MemoryRouter>
    );
    expect(setPageTitle).toHaveBeenCalledWith(
      `${VIEWS.SNOOZED_CASES.TITLE} | Case Issue Navigator`
    );
  });
  it("should connect to the store", () => {
    store.dispatch(appStatusActionCreators.setUser("Fred"));
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
