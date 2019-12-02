import React from "react";
import { storiesOf } from "@storybook/react";
import CaseList from "../view/CaseList";
import { IS_TEST_ENV } from "../controller/config";
import { store } from "../redux/create";
import { Provider } from "react-redux";
import { casesActionCreators } from "../redux/modules/cases";
// Known workaround to mock createPortal for jest testing
if (IS_TEST_ENV) {
  jest.mock("react-dom", () => ({
    createPortal: node => node
  }));
}

const headers = [
  { key: "receiptNumber" },
  { key: "applicationReason" },
  { key: "caseStatus" }
];

// TODO: rewrite with container component due to loading state

storiesOf("CaseList", module)
  .add("Empty case list", () => (
    <Provider store={store}>
      <CaseList headers={headers} totalCases={0} />
    </Provider>
  ))
  .add("Case list with some data", () => {
    store.dispatch(casesActionCreators.clearCases());
    store.dispatch(
      casesActionCreators.addCases([
        {
          receiptNumber: "fak1",
          extraData: {
            applicationReason: "hello world",
            caseStatus: "abc"
          }
        },
        {
          receiptNumber: "fak2",
          extraData: {
            applicationReason: "hello world2",
            caseStatus: "abc2"
          }
        }
      ])
    );
    store.dispatch(casesActionCreators.setIsLoading(false));

    return (
      <Provider store={store}>
        <CaseList headers={headers} totalCases={2} />
      </Provider>
    );
  })
  .add("Case list while loading data", () => {
    store.dispatch(casesActionCreators.clearCases());
    store.dispatch(
      casesActionCreators.addCases([
        {
          receiptNumber: "fak1",
          extraData: {
            applicationReason: "hello world",
            caseStatus: "abc"
          }
        },
        {
          receiptNumber: "fak2",
          extraData: {
            applicationReason: "hello world2",
            caseStatus: "abc2"
          }
        }
      ])
    );
    store.dispatch(casesActionCreators.setIsLoading(false));
    return (
      <Provider store={store}>
        <CaseList headers={headers} totalCases={10} />
      </Provider>
    );
  })
  .add("Caselist with more cases to load", () => {
    store.dispatch(casesActionCreators.clearCases());
    store.dispatch(
      casesActionCreators.addCases([
        {
          receiptNumber: "FAK1",
          extraData: {
            applicationReason: "Hello world",
            caseStatus: "ABC"
          }
        },
        {
          receiptNumber: "FAK2",
          extraData: {
            applicationReason: "Hello world2",
            caseStatus: "ABC2"
          }
        }
      ])
    );
    store.dispatch(casesActionCreators.setIsLoading(false));
    return (
      <Provider store={store}>
        <CaseList headers={headers} totalCases={200} />
      </Provider>
    );
  });
