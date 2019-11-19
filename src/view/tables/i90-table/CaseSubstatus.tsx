import React from "react";

interface Props {
  caseData: Case;
}

export const CaseSubstatus: React.FC<Props> = ({ caseData }) => (
  <React.Fragment>{caseData.extraData.caseSubstatus}</React.Fragment>
);
