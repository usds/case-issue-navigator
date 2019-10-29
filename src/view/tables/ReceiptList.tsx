import React from "react";
import { TabularList } from "./TabularList";

interface Props {
  cases: Case[];
  headers: I90Header[];
  isLoading: boolean;
}

export default function ReceiptList(props: Props) {
  if (props.cases.length === 0 && props.isLoading) {
    return null;
  }

  if (props.cases.length === 0 && !props.isLoading) {
    return <p>No cases found.</p>;
  }

  return <TabularList cases={props.cases} headers={props.headers} />;
}