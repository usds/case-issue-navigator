import React from "react";
import PropTypes from "prop-types";
import { TableCell } from "./TableCell";
import "./ReceiptDisplayRow.scss";
import { CaseDetails } from "./CaseDetails";

const ReceiptDisplayRow = props => {
  const { data, callback, headers } = props;
  const numberOfColumns = headers.length;
  return (
    <React.Fragment>
      <tr className={data.showDetails ? "row--show-details" : undefined}>
        {headers.map((header, i) => (
          <TableCell
            key={`${data.caseId}-${i}`}
            rowData={data}
            header={header}
            callback={callback}
          />
        ))}
      </tr>
      {data.showDetails && (
        <CaseDetails
          numberOfColumns={numberOfColumns}
          receiptNumber={data.receiptNumber}
        />
      )}
    </React.Fragment>
  );
};

ReceiptDisplayRow.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object.isRequired,
  callback: PropTypes.objectOf(PropTypes.func).isRequired
};

export default ReceiptDisplayRow;
