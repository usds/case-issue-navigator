import React from "react";
import { SNOOZE_OPTIONS } from "../../../controller/config";
import "./Problem.scss";

interface Props {
  caseData: Case;
}

export const Problem: React.FC<Props> = ({ caseData }) => {
  let problem = "";

  const reason = caseData.snoozeInformation
    ? caseData.snoozeInformation.snoozeReason
    : undefined;
  if (!reason) {
    return null;
  } else {
    problem = SNOOZE_OPTIONS[reason]
      ? SNOOZE_OPTIONS[reason].shortText
      : reason;
  }

  return (
    <div style={{ marginRight: "5px" }}>
      <span
        className={`usa-tag ${reason}`}
        style={{
          textTransform: "none",
          whiteSpace: "nowrap"
        }}
      >
        {problem}
      </span>
    </div>
  );
};
