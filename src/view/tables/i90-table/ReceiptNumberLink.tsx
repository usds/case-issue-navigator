import React from "react";
import { ELIS_CASE_BASE_URL } from "../../../controller/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

interface Props {
  caseData: Case;
  snoozeState: SnoozeState;
}

export const ReceiptNumberLink: React.FC<Props> = ({
  caseData,
  snoozeState
}) => (
  <React.Fragment>
    <a href={ELIS_CASE_BASE_URL + caseData.receiptNumber} target="_elis_viewer">
      {caseData.receiptNumber}
    </a>
    {snoozeState === "ACTIVE" &&
    caseData &&
    caseData.snoozeInformation &&
    caseData.snoozeInformation.snoozeStart ? (
      <React.Fragment>
        &nbsp;
        <FontAwesomeIcon
          icon="exclamation-triangle"
          className="text-accent-warm"
          aria-label="Case Overdue - Please Review"
          data-tip
          data-place="right"
        />
        <ReactTooltip>Case Overdue - Please Review</ReactTooltip>
      </React.Fragment>
    ) : null}
  </React.Fragment>
);
