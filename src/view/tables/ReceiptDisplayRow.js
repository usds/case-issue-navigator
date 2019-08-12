import React from "react";
import PropTypes from "prop-types";
import { TableCell } from "./TableCell";

const ReceiptDisplayRow = props => (
  <tr>
    {props.headers.map((header, i) => (
      <TableCell
        key={`${props.data.caseId}-${i}`}
        rowData={props.data}
        header={header}
        callback={props.callback}
      />
    ))}
  </tr>
);

ReceiptDisplayRow.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object.isRequired,
  callback: PropTypes.objectOf(PropTypes.func).isRequired
};

export default ReceiptDisplayRow;