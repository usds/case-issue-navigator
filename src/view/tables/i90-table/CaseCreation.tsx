import React from "react";
import DateUtils from "../../../utils/DateUtils";

interface Props {
  caseData: Case;
}

export const CaseCreation: React.FC<Props> = ({ caseData }) => {
  const displayDate = DateUtils.badgeFormat(caseData.caseCreation);
  return <React.Fragment>{displayDate}</React.Fragment>;
};
