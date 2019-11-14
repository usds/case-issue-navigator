import React from "react";
import { mount } from "enzyme";
import ErrorHandler from "../ErrorHandler";
import { store } from "../../../redux/create";
import { appStatusActionCreators } from "../../../redux/modules/appStatus";
import { Provider } from "react-redux";

describe("ErrorHandler", () => {
  const consoleError = console.error;
  const {
    setDataLoadError,
    clearUser,
    setNotification
  } = appStatusActionCreators;
  jest.spyOn(store, "dispatch");

  beforeEach(() => {
    console.error = jest.fn();
    store.dispatch(setDataLoadError(null));
    (store.dispatch as jest.Mock).mockClear();
  });

  afterEach(() => {
    console.error = consoleError;
  });

  it("should set an access notification on 403 error", () => {
    const error: APIError = {
      status: 403,
      error: "Bad",
      message: "Forbidden",
      timestamp: "12345"
    };
    store.dispatch(setDataLoadError(error));
    mount(
      <Provider store={store}>
        <ErrorHandler />
      </Provider>
    );
    expect(store.dispatch).toBeCalledWith(
      setNotification({
        type: "error",
        message: "You do not have access to this system."
      })
    );
  });
  it("should clear the user's login on 401 error", () => {
    const error: APIError = {
      status: 401,
      error: "Bad",
      message: "Unauthorized",
      timestamp: "12345"
    };
    store.dispatch(setDataLoadError(error));
    mount(
      <Provider store={store}>
        <ErrorHandler />
      </Provider>
    );
    expect(store.dispatch).toBeCalledWith(clearUser());
  });
  it("should console.error any other errors", () => {
    const error: APIError = {
      status: 500,
      error: "Bad",
      message: "Server error",
      timestamp: "12345"
    };
    store.dispatch(setDataLoadError(error));
    mount(
      <Provider store={store}>
        <ErrorHandler />
      </Provider>
    );
    expect(console.error).toBeCalledWith(error);
  });
  it("should not dispatch any actions without errors", () => {
    mount(
      <Provider store={store}>
        <ErrorHandler />
      </Provider>
    );
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});
