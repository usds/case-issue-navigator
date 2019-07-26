import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// this should come from the DB
const elisCaseUrlBase =
  "https://internal-prod-elis2.uscis.dhs.gov/InternalApp/app/#/case/";

const cellDispatch = {
  LINK: (r, rowData) => (
    <>
      <a href={elisCaseUrlBase + r} target="_elis_viewer">
        {r}
      </a>
      {rowData.desnoozed ? (
        <FontAwesomeIcon
          icon="exclamation-triangle"
          className="text-accent-warm"
        />
      ) : null}
    </>
  ),
  DATE: d => {
    const datum = new Date(d);
    return (
      datum.getMonth() + 1 + "/" + datum.getDate() + "/" + datum.getFullYear()
    );
  }
};

const ReceiptDisplayRow = props => (
  <tr>
    {props.headers.map(header =>
      _table_cell(props.data, header, props.callback)
    )}
  </tr>
);

export default ReceiptDisplayRow;

function _table_cell(rowData, header, callback) {
  let datum = rowData[header.field];
  if (header.content !== undefined) {
    const processor =
      "function" === typeof header.content
        ? header.content
        : cellDispatch[header.content];
    datum = processor(datum, rowData, header, callback);
  }
  return <td key={header.header}>{datum}</td>;
}
