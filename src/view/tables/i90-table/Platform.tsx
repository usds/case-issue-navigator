import React from "react";

interface Props {
  caseData: Case;
}

export const Platform: React.FC<Props> = ({ caseData }) => (
  <React.Fragment>
    {String(caseData.extraData.i90SP) === "true" ? "SP" : "Legacy"}
  </React.Fragment>
);
