import React from "react";
import PropTypes from "prop-types";

const TableCell = props => {
  return (
    <td key={props.header.header}>
      {props.header.content(props.rowData, props.callback)}
    </td>
  );
};

TableCell.propTypes = {
  rowData: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  callback: PropTypes.objectOf(PropTypes.func).isRequired
};

export { TableCell };
