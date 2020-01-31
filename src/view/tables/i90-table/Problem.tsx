import React from "react";
import { SNOOZE_OPTIONS } from "../../../controller/config";
import DateUtils from "../../../utils/DateUtils";
import ReactTooltip from "react-tooltip";
import CaseUtils from "../../../utils/CaseUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface Props {
  caseData: Case;
}

export const Problem: React.FC<Props> = ({ caseData }) => {
  let problem = "";

  const reason = caseData.snoozeInformation
    ? caseData.snoozeInformation.snoozeReason
    : undefined;
  if (!reason) {
    console.error("Snooze information not found");
  } else {
    problem = SNOOZE_OPTIONS[reason]
      ? SNOOZE_OPTIONS[reason].shortText
      : reason;
  }

  const renderBadge = () => {
    const dueDate = CaseUtils.getDueDate(caseData);
    if (!dueDate) {
      return <React.Fragment />;
    }
    const overdue = CaseUtils.isOverDue(caseData);
    return (
      <div>
        <span
          className={`usa-tag ${overdue ? "bg-secondary" : ""}`}
          data-tip={
            overdue
              ? "Case Overdue - Please Review"
              : `Expected to be unblocked by ${DateUtils.badgeFormat(dueDate)}`
          }
          data-place="right"
          style={{
            textTransform: "none",
            whiteSpace: "nowrap"
          }}
        >
          <ReactTooltip></ReactTooltip>
          <FontAwesomeIcon icon={faClock} /> {DateUtils.badgeFormat(dueDate)}
        </span>
      </div>
    );
  };

  return (
    <React.Fragment>
      {problem} {renderBadge()}
    </React.Fragment>
  );
};
