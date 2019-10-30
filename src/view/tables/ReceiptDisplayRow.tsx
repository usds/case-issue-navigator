import React from "react";
import { TableCell } from "./TableCell";
import "./ReceiptDisplayRow.scss";
import { CaseDetails } from "./CaseDetails";

interface Props {
  headers: I90Header[];
  data: Case;
}

const ReceiptDisplayRow = (props: Props) => {
  const { data, headers } = props;
  const numberOfColumns = headers.length;
  return (
    <React.Fragment>
      <tr className={data.showDetails ? "row--show-details" : undefined}>
        {headers.map((header, i) => {
          return <TableCell key={i} rowData={data} header={header} />;
        })}
      </tr>
      {data.showDetails && (
        <CaseDetails numberOfColumns={numberOfColumns} rowData={data} />
      )}
    </React.Fragment>
  );
};

export default ReceiptDisplayRow;
