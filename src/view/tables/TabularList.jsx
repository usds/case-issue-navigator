import React from "react";
import ReceiptDisplayRow from "./ReceiptDisplayRow";

const TabularList = props => {
  return (
    <table className="usa-table usa-table--borderless width-full">
      <thead>
        <tr>
          {props.header_definitions.map(h => (
            <th key={h.header}>{h.header}</th>
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
