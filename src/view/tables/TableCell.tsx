import React from "react";
import { cellDispatch } from "../util/cellDispatch";
import "./TableCell.scss";

interface Props {
  rowData: Case;
  header: I90Header;
  callback: any;
}

const TableCell = (props: Props) => {
  const getCellValue = () => {
    const datum = props.header.field ? props.rowData[props.header.field] : "";
    const processor =
      "function" === typeof props.header.content
        ? props.header.content
        : cellDispatch[props.header.content];
    return processor(datum, props.rowData, props.header, props.callback);
  };

  return (
    <td
      className={props.header.header === "" ? "min" : undefined}
      key={props.header.header}
    >
      {getCellValue()}
    </td>
  );
};

export { TableCell };
