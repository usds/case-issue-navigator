import React from "react";
import "./TableCell.scss";
import { I90_HEADERS } from "../../controller/config";

interface Props {
  rowData: Case;
  header: I90Header;
}

const TableCell = (props: Props) => {
  const h = I90_HEADERS[props.header.key];
  return (
    <td className={h.header === "" ? "min" : undefined} key={h.header}>
      {h.render(props.rowData, props.header.props)}
    </td>
  );
};

export { TableCell };
