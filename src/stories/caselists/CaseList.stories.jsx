import React from "react";
import { storiesOf } from "@storybook/react";
import { CaseList } from "../../view/caselists/CaseList";
import { IS_TEST_ENV } from "../../controller/config";

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

storiesOf("CaseList", module)
  .add("Empty case list", () => (
    <CaseList
      isLoading={false}
      headers={headers}
      cases={[]}
      loadMoreCases={() => undefined}
      totalCases={0}
    />
  ))
  .add("Case list with some data", () => {
    const cases = [
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
    ];

    return (
      <CaseList
        loadMoreCases={() => null}
        cases={cases}
        isLoading={false}
        headers={headers}
        totalCases={2}
      />
    );
  })
  .add("Case list while loading data", () => {
    const cases = [
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
    ];
    return (
      <CaseList
        loadMoreCases={() => null}
        cases={cases}
        isLoading={true}
        headers={headers}
        totalCases={10}
      />
    );
  })
  .add("Caselist with more cases to load", () => {
    const cases = [
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
    ];

    return (
      <CaseList
        loadMoreCases={() => null}
        cases={cases}
        isLoading={false}
        headers={headers}
        totalCases={200}
      />
    );
  });
