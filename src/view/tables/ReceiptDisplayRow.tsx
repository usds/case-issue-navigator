import React from "react";
import { TableCell } from "./TableCell";
import "./ReceiptDisplayRow.scss";
import { CaseDetails } from "./CaseDetails";

interface Props {
  headers: I90Header[];
  data: Case;
  callback: any;
}

const ReceiptDisplayRow = (props: Props) => {
  const { data, callback, headers } = props;
  const numberOfColumns = headers.length;
  return (
    <React.Fragment>
      <tr className={data.showDetails ? "row--show-details" : undefined}>
        {headers.map((header, i) => {
          return (
            <TableCell
              key={`${data.extraData.caseId}-${i}`}
              rowData={data}
              header={header}
              callback={callback}
            />
          );
        })}
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

export default ReceiptDisplayRow;
