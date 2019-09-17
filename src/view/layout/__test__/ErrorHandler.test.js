import React from "react";
import { mount } from "enzyme";
import { ErrorHandler } from "../ErrorHandler";
import { AuthContext } from "../../auth/AuthContainer";

describe("ErrorHandler", () => {
  const consoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = consoleError;
  });

  it("should set an access notification on 403 error", () => {
    const setNotification = jest.fn();
    const error = {
      status: 403,
      message: "Forbidden"
    };
    mount(<ErrorHandler setNotification={setNotification} error={error} />);
    expect(setNotification).toBeCalledWith({
      message: "You do not have access to this system.",
      type: "error"
    });
  });
  it("should set logged in to false on 401 error", () => {
    const setNotification = jest.fn();
    const setLoggedIn = jest.fn();
    const error = {
      status: 401,
      message: "Unauthorized"
    };
    mount(
      <AuthContext.Provider value={{ loggedIn: true, setLoggedIn }}>
        <ErrorHandler setNotification={setNotification} error={error} />
      </AuthContext.Provider>
    );
    expect(setLoggedIn).toBeCalledWith(false);
  });
  it("should console.error any other errors", () => {
    const setNotification = jest.fn();
    const setLoggedIn = jest.fn();
    const error = {
      status: 500,
      message: "Server error"
    };
    mount(
      <AuthContext.Provider value={{ loggedIn: true, setLoggedIn }}>
        <ErrorHandler setNotification={setNotification} error={error} />
      </AuthContext.Provider>
    );
    expect(console.error).toBeCalledWith({
      message: "Server error",
      status: 500
    });
  });
  it("should not do anything if the error is malformed", () => {
    const setNotification = jest.fn();
    const setLoggedIn = jest.fn();
    const error = {};
    mount(
      <AuthContext.Provider value={{ loggedIn: true, setLoggedIn }}>
        <ErrorHandler setNotification={setNotification} error={error} />
      </AuthContext.Provider>
    );
    expect(setLoggedIn).toBeCalledTimes(0);
    expect(setNotification).toBeCalledTimes(0);
    expect(console.error).toBeCalledTimes(0);
  });
});
