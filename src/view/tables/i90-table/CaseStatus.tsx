import React from "react";

interface Props {
  caseData: Case;
}

export const CaseStatus: React.FC<Props> = ({ caseData }) => (
  <React.Fragment>
    <b>{caseData.extraData.caseStatus}</b> - {caseData.extraData.caseSubstatus}
  </React.Fragment>
);
