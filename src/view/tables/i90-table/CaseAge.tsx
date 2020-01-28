import React from "react";
import DateUtils from "../../../utils/DateUtils";

interface Props {
  caseData: Case;
}

export const CaseAge: React.FC<Props> = ({ caseData }) => {
  return (
    <React.Fragment>
      {DateUtils.numberOfDaysSince(caseData.caseCreation)}
    </React.Fragment>
  );
};
