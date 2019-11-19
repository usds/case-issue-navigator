import React from "react";

interface Props {
  caseData: Case;
}

export const ApplicationReason: React.FC<Props> = ({ caseData }) => (
  <React.Fragment>{caseData.extraData.applicationReason}</React.Fragment>
);
