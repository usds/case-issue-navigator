import React from "react";
import { cellDispatch } from "../util/cellDispatch";

const TableCell = props => {
  let datum = props.rowData[props.header.field];
  if (props.header.content !== undefined) {
    const processor =
      "function" === typeof props.header.content
        ? props.header.content
        : cellDispatch[props.header.content];
    datum = processor(datum, props.rowData, props.header, props.callback);
  }
  return <td key={props.header.header}>{datum}</td>;
};

export { TableCell };
