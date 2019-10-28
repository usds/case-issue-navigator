import React from "react";
import PropTypes from "prop-types";
import { cellDispatch } from "../util/cellDispatch";
import "./TableCell.scss";

const TableCell = props => {
  let datum = props.rowData[props.header.field];
  if (props.header.content !== undefined) {
    const processor =
      "function" === typeof props.header.content
        ? props.header.content
        : cellDispatch[props.header.content];
    datum = processor(datum, props.rowData, props.header, props.callback);
  }
  return (
    <td
      className={props.header.header === "" ? "min" : undefined}
      key={props.header.header}
    >
      {datum}
    </td>
  );
};

TableCell.propTypes = {
  rowData: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  callback: PropTypes.objectOf(PropTypes.func).isRequired
};

export { TableCell };
