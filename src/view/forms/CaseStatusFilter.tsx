import React from "react";
import UsaSelect from "./UsaSelect";
import "./CaseAgeFilter.scss";

interface Props {
  caseStatus?: CaseStatusOptions;
  onUpdate: (caseStatus: CaseStatusOptions | undefined) => void;
}

interface Option {
  value: CaseStatusOptions | undefined;
  text: string;
}

const DEFAULT_TEXT = "All";
const OPTIONS: Option[] = [
  { text: DEFAULT_TEXT, value: undefined },
  { text: "Approved", value: "Approved" },
  { text: "Denied", value: "Denied" },
  { text: "In Process", value: "In Process" },
  { text: "Terminated", value: "Terminated" }
];

const CaseStatusFilter: React.FunctionComponent<Props> = props => {
  return (
    <React.Fragment>
      <UsaSelect
        options={OPTIONS}
        placeholder={DEFAULT_TEXT}
        name="caseStatus"
        selected={props.caseStatus}
        onChange={props.onUpdate}
        label="Case Status"
      />
    </React.Fragment>
  );
};

export { CaseStatusFilter };
