import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CaseList } from "../../view/caselists/CaseList";
import { IS_TEST_ENV } from "../../controller/config";

// Known workaround to mock createPortal for jest testing
if (IS_TEST_ENV) {
  jest.mock("react-dom", () => ({
    createPortal: node => node
  }));
}

storiesOf("CaseList", module)
  .add("Empty case list", () => (
    <CaseList
      loadCases={() => null}
      showDialog={false}
      callbacks={{ a: () => null, b: () => null }}
      clickedRow={null}
      cases={[{}]}
      isLoading={false}
      headers={[
        { header: "header 1" },
        { header: "header 2" },
        { header: "header 3" }
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
      { header: "header 1", field: "field1" },
      { header: "header 2", field: "field2" },
      { header: "header 3", field: "field3" }
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
      />
    );
  })
  .add("Case list while loading data", () => {
    const cases = [];
    const headers = [
      { header: "header 1", field: "field1" },
      { header: "header 2", field: "field2" },
      { header: "header 3", field: "field3" }
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
      />
    );
  });
