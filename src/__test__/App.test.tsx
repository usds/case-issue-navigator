import React from "react";
import { mount } from "enzyme";
import App from "../App";
import { MemoryRouter } from "react-router";
import { Helmet } from "react-helmet";
import { VIEWS } from "../controller/config";
import { store } from "../redux/create";
import { Provider } from "react-redux";
import { appStatusActionCreators } from "../redux/modules/appStatus";

describe("App", () => {
  const { setPageTitle } = appStatusActionCreators;
  jest.spyOn(store, "dispatch");
  beforeEach(() => {
    (store.dispatch as jest.Mock).mockClear();
    store.dispatch(appStatusActionCreators.clearUser());
    store.dispatch(appStatusActionCreators.setIsInitializing(false));
  });
  it("should show the correct title for Cases to Work", () => {
    store.dispatch(appStatusActionCreators.setUser("Fred"));
    mount(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setPageTitle(`${VIEWS.CASES_TO_WORK.TITLE} | Case Issue Navigator`)
    );
  });
  it("should show the correct title for Snoozed Cases", () => {
    store.dispatch(appStatusActionCreators.setUser("Fred"));
    mount(
      <MemoryRouter initialEntries={["/snoozed-cases"]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setPageTitle(`${VIEWS.SNOOZED_CASES.TITLE} | Case Issue Navigator`)
    );
  });
  it("Helmet title should match route title", () => {
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
