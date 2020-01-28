import React from "react";
import DateUtils from "../../../utils/DateUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

interface Props {
  caseData: Case;
  snoozeState: SnoozeState;
}

export const SnoozeDaysLeft: React.FC<Props> = ({ caseData, snoozeState }) => {
  const snoozeEnd = caseData.snoozeInformation
    ? caseData.snoozeInformation.snoozeEnd
    : undefined;
  if (!snoozeEnd) {
    console.error("Snooze information not found");
    return <React.Fragment />;
  }
  return (
    <React.Fragment>
      {DateUtils.shortFormatDate(snoozeEnd)}

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
};
