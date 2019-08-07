import React from "react";
import { TabularList } from "./TabularList";

export default function ReceiptList(props) {
  if (!props.cases.length) {
    return <p>{props.isLoading ? "Loading..." : "No cases found."}</p>;
  }

  return (
    <TabularList
      cases={props.cases}
      callback={props.callback}
      header_definitions={props.headers}
    />
  );
}
