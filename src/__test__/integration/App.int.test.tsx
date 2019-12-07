import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";
import { Provider } from "react-redux";
import { rootReducer } from "../../redux/create";
import { MemoryRouter } from "react-router";
import { activeCases } from "./fakeData";
import {
  successfulLoadAPIMock,
  unsuccessfulLoadAPIMock,
  snoozeMock
} from "./apiMockUtils";
import nock from "nock";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const createTestStore = () =>
  createStore(rootReducer, compose(applyMiddleware(thunk)));

describe("App integration", () => {
  let apiMock;
  it("Renders user name, number of cases, and the case list on startup", async () => {
    apiMock = successfulLoadAPIMock();
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createTestStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    // Completed when user endpoint resolved
    await waitForElement(() => getByText("John Doe"));
    // Completed when active cases endpoint resolves
    await waitForElement(() => getByText(activeCases[0].receiptNumber));

    apiMock.done();
  });

  it("Renders the auth screen if not logged in", async () => {
    unsuccessfulLoadAPIMock();
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createTestStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    // Completed when login screen renders
    await waitForElement(() => getByText(/Log In to USCIS/i));
  });

  it("Loads successfully and allows the user to snooze a case", async () => {
    apiMock = successfulLoadAPIMock();
    const { getByText, queryAllByText } = render(
      <MemoryRouter>
        <Provider store={createTestStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    // Completed when user endpoint resolved
    await waitForElement(() => getByText("John Doe"));
    // Completed when active cases endpoint resolves
    await waitForElement(() => getByText(activeCases[0].receiptNumber));

    fireEvent(
      getByText("Triage"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    const mock = snoozeMock(activeCases[0].receiptNumber);

    fireEvent(
      getByText("Save"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    await waitForElement(() => getByText(/has been snoozed/i));

    mock.done();
  });

  afterEach(() => {
    nock.cleanAll();
    cleanup();
  });
});
