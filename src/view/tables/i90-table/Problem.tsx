import React from "react";
import { SNOOZE_OPTIONS } from "../../../controller/config";

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

  return <React.Fragment>{problem}</React.Fragment>;
};
