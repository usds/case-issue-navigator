import React from "react";
import { ChevronToggle } from "../../util/ChevronToggle";
import { casesActionCreators } from "../../../redux/modules/cases";

interface Props {
  caseData: Case;
  toggleDetails: (
    receiptNumber: string
  ) => ReturnType<typeof casesActionCreators.toggleDetails>;
}

export const DetailToggle: React.FC<Props> = ({ caseData, toggleDetails }) => (
  <ChevronToggle
    toggle={() => toggleDetails(caseData.receiptNumber)}
    open={caseData.showDetails}
  />
);
