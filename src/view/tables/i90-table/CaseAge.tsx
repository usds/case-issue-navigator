import React from "react";
import DateUtils from "../../../utils/DateUtils";

interface Props {
  caseData: Case;
}

export const CaseAge: React.FC<Props> = ({ caseData }) => {
  const caseCreationDays = DateUtils.numberOfDaysSince(caseData.caseCreation);
  const caseCreationPlural = caseCreationDays === 1 ? "" : "s";
  return (
    <React.Fragment>{`${caseCreationDays} day${caseCreationPlural}`}</React.Fragment>
  );
};
