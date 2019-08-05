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

const TableCell = props => {
  let datum = props.rowData[props.header.field];
  if (props.header.content !== undefined) {
    const processor =
      "function" === typeof props.header.content
        ? props.header.content
        : cellDispatch[props.header.content];
    datum = processor(datum, props.rowData, props.header, props.callback);
  }
  return <td key={props.header.header}>{datum}</td>;
};
