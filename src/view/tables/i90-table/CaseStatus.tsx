import React from "react";

interface Props {
  caseData: Case;
}

export const CaseStatus: React.FC<Props> = ({ caseData }) => (
  <React.Fragment>{caseData.extraData.caseStatus}</React.Fragment>
);
