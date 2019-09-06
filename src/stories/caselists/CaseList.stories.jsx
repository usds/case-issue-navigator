import React from "react";
import { storiesOf } from "@storybook/react";
import { CaseList } from "../../view/caselists/CaseList";
import { IS_TEST_ENV, VIEWS } from "../../controller/config";
import SnoozeForm from "../../controller/SnoozeForm";

// Known workaround to mock createPortal for jest testing
if (IS_TEST_ENV) {
  jest.mock("react-dom", () => ({
    createPortal: node => node
  }));
}

storiesOf("CaseList", module)
  .add("Empty case list", () => (
    <CaseList
      isLoading={false}
      headers={[
        {
          header: "header 1",
          field: "field1",
          views: [VIEWS.CASES_TO_WORK.TITLE]
        },
        {
          header: "header 2",
          field: "field1",
          views: [VIEWS.CASES_TO_WORK.TITLE]
        },
        {
          header: "header 3",
          field: "field1",
          views: [VIEWS.CASES_TO_WORK.TITLE]
        }
      ]}
      callbacks={{ a: () => null, b: () => null }}
      cases={[]}
      currentPage={0}
      setCurrentPage={() => null}
      ModalContent={SnoozeForm}
    />
  ))
  .add("Case list with some data", () => {
    const cases = [
      {
        receiptNumber: "FAK1",
        field1: "foobar",
        field2: "Hello world",
        field3: "ABC"
      },
      {
        receiptNumber: "FAK2",
        field1: "foobar2",
        field2: "Hello world2",
        field3: "ABC2"
      }
    ];
    const headers = [
      {
        header: "header 1",
        field: "field1",
        views: [VIEWS.CASES_TO_WORK.TITLE]
      },
      {
        header: "header 2",
        field: "field2",
        views: [VIEWS.CASES_TO_WORK.TITLE]
      },
      {
        header: "header 3",
        field: "field3",
        views: [VIEWS.CASES_TO_WORK.TITLE]
      }
    ];

    return (
      <CaseList
        loadCases={() => null}
        showDialog={false}
        callbacks={{ a: () => null, b: () => null }}
        clickedRow={null}
        cases={cases}
        isLoading={false}
        headers={headers}
        ModalContent={SnoozeForm}
      />
    );
  })
  .add("Case list while loading data", () => {
    const cases = [];
    const headers = [
      {
        header: "header 1",
        field: "field1",
        views: [VIEWS.CASES_TO_WORK.TITLE]
      },
      {
        header: "header 2",
        field: "field2",
        views: [VIEWS.CASES_TO_WORK.TITLE]
      },
      {
        header: "header 3",
        field: "field3",
        views: [VIEWS.CASES_TO_WORK.TITLE]
      }
    ];
    return (
      <CaseList
        loadCases={() => null}
        showDialog={false}
        callbacks={{ a: () => null, b: () => null }}
        clickedRow={null}
        cases={cases}
        isLoading={true}
        headers={headers}
        ModalContent={SnoozeForm}
      />
    );
  });
