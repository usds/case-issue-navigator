import React from "react";
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

export default ReceiptDisplayRow;
