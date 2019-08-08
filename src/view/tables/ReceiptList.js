import React from "react";
import PropTypes from "prop-types";
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

ReceiptList.propTypes = {
  cases: PropTypes.arrayOf(PropTypes.object),
  callback: PropTypes.objectOf(PropTypes.func).isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired
};
