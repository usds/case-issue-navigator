import React from "react";
import { ELIS_CASE_BASE_URL } from "../../../controller/config";

interface Props {
  caseData: Case;
}

export const ReceiptNumberLink: React.FC<Props> = ({
  caseData,
}) => (
  <React.Fragment>
    <a href={ELIS_CASE_BASE_URL + caseData.receiptNumber} target="_elis_viewer">
      {caseData.receiptNumber}
    </a>
  </React.Fragment>
);
