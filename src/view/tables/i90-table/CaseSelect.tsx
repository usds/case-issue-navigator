import React from "react";
import UsaCheckbox from "../../forms/UsaCheckbox";

interface Props {
  caseData: Case;
  selected: boolean;
  toggleSelect: (c: Case) => void;
}

export const CaseSelect: React.FC<Props> = ({caseData, selected, toggleSelect}) => (
  <UsaCheckbox
    id={`CaseSelect${caseData.receiptNumber}`}
    value={selected}
    onChange={() => toggleSelect(caseData)}
    label=""
  />
);
