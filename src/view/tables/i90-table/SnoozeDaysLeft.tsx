import React from "react";
import DateUtils from "../../../utils/DateUtils";

interface Props {
  caseData: Case;
}

export const SnoozeDaysLeft: React.FC<Props> = ({ caseData }) => {
  const snoozeEnd = caseData.snoozeInformation
    ? caseData.snoozeInformation.snoozeEnd
    : undefined;
  if (!snoozeEnd) {
    console.error("Snooze information not found");
    return <React.Fragment />;
  }
  const days = DateUtils.numberOfDaysUntil(snoozeEnd);
  const plural = days === 1 ? "" : "s";
  return <React.Fragment>{`${days} day${plural}`}</React.Fragment>;
};
