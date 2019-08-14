import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ActiveCaseList } from "../../view/caselists/ActiveCaseList";

// Known workaround to mock createPortal for jest testing
jest.mock("react-dom", () => ({
  createPortal: node => node
}));

storiesOf("ActiveCaseList", module)
  .add("Empty case list", () => (
    <ActiveCaseList
      loadCases={() => null}
      showDialog={false}
      callbacks={{ a: () => null, b: () => null }}
      clickedRow={null}
      cases={[{}]}
      isLoading={false}
      headers={[
        { header: "header 1", content: () => "" },
        { header: "header 2", content: () => "" },
        { header: "header 3", content: () => "" }
      ]}
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
      { header: "header 1", content: data => data.field1 },
      { header: "header 2", content: data => data.field2 },
      { header: "header 3", content: data => data.field3 }
    ];

    return (
      <ActiveCaseList
        loadCases={() => null}
        showDialog={false}
        callbacks={{ a: () => null, b: () => null }}
        clickedRow={null}
        cases={cases}
        isLoading={false}
        headers={headers}
      />
    );
  })
  .add("Case list while loading data", () => {
    const cases = [];
    const headers = [
      { header: "header 1", content: data => data.field1 },
      { header: "header 2", content: data => data.field2 },
      { header: "header 3", content: data => data.field3 }
    ];
    return (
      <ActiveCaseList
        loadCases={() => null}
        showDialog={false}
        callbacks={{ a: () => null, b: () => null }}
        clickedRow={null}
        cases={cases}
        isLoading={true}
        headers={headers}
      />
    );
  })
  .add("Case list with modal", () => {
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
      { header: "header 1", content: data => data.field1 },
      { header: "header 2", content: data => data.field2 },
      { header: "header 3", content: data => data.field3 }
    ];
    return (
      <ActiveCaseList
        loadCases={() => null}
        showDialog={true}
        callbacks={{
          closeDialog: action("close modal"),
          snooze: action("snoozed")
        }}
        clickedRow={cases[0]}
        dialogTitle={cases[0].receiptNumber}
        cases={cases}
        isLoading={true}
        headers={headers}
      />
    );
  });
