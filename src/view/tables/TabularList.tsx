import React from "react";
import ReceiptDisplayRow from "./ReceiptDisplayRow";
import "./TableCell.scss";

interface Props {
  header_definitions: Header[];
  cases: Case[];
  callback: any;
}

const TabularList = (props: Props) => {
  return (
    <table className="usa-table usa-table--borderless width-full">
      <thead>
        <tr>
          {props.header_definitions.map(h => (
            <th className={h.header === "" ? "min" : undefined} key={h.header}>
              {h.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.cases.map(r => (
          <ReceiptDisplayRow
            key={"ELIS-" + r.receiptNumber}
            data={r}
            headers={props.header_definitions}
            callback={props.callback}
          />
        ))}
      </tbody>
    </table>
  );
};

export { TabularList };
