import React from "react";
import PropTypes from "prop-types";
import ReceiptDisplayRow from "./ReceiptDisplayRow";
import "./TableCell.scss";

const TabularList = props => {
  return (
    <table className="usa-table usa-table--borderless width-full">
      <thead>
        <tr>
          {props.header_definitions.map(h => (
            <th className={h.header === "" ? "min" : ""} key={h.header}>
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

TabularList.propTypes = {
  header_definitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  cases: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.objectOf(PropTypes.func).isRequired
};

export { TabularList };
