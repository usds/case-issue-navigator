import React from "react";
import DateUtils from "../../../utils/DateUtils";

interface Props {
  caseData: Case;
}

export const CaseCreation: React.FC<Props> = ({ caseData }) => {
  const displayDate = DateUtils.shortFormatDate(caseData.caseCreation);
  const caseCreationDays = DateUtils.numberOfDaysSince(caseData.caseCreation);
  const caseCreationPlural = caseCreationDays === 1 ? "" : "s";

  return (
    <React.Fragment>
      {displayDate}
      <br />({`${caseCreationDays} day${caseCreationPlural}`})
    </React.Fragment>
  );
};
