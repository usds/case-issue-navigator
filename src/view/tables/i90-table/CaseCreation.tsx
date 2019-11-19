import React from "react";

interface Props {
  caseData: Case;
}

export const CaseCreation: React.FC<Props> = ({ caseData }) => {
  const d = caseData.caseCreation;
  const datum = new Date(d);
  let displayDate = "Invalid date";

  if (d && !isNaN(datum as any)) {
    displayDate =
      datum.getMonth() + 1 + "/" + datum.getDate() + "/" + datum.getFullYear();
  }

  return <React.Fragment>{displayDate}</React.Fragment>;
};
