import React from "react";
import ReceiptDisplayRow from "./ReceiptDisplayRow";
import "./TableCell.scss";
import { I90_HEADERS } from "../../controller/config";

interface Props {
  headers: I90Header[];
  cases: Case[];
}

const TabularList = (props: Props) => {
  const renderHeader = (h: I90Header) => {
    const header = I90_HEADERS[h.key].header;
    return (
      <th className={header === "" ? "min" : undefined} key={header}>
        {header}
      </th>
    );
  };

  return (
    <table className="usa-table usa-table--borderless width-full">
      <thead>
        <tr>{props.headers.map(renderHeader)}</tr>
      </thead>
      <tbody>
        {props.cases.map(r => (
          <ReceiptDisplayRow
            key={"ELIS-" + r.receiptNumber}
            data={r}
            headers={props.headers}
          />
        ))}
      </tbody>
    </table>
  );
};

export { TabularList };
