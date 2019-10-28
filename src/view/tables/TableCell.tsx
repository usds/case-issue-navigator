import React from "react";
import { cellDispatch } from "../util/cellDispatch";
import "./TableCell.scss";

interface Props {
  rowData: Case;
  header: Header;
  callback: any;
}

const TableCell = (props: Props) => {
  let datum: string = (props.rowData as any)[props.header.field];
  if (props.header.content !== undefined) {
    const processor =
      "function" === typeof props.header.content
        ? props.header.content
        : (cellDispatch as any)[props.header.content];
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

export { TableCell };
