import React from "react";
import UsaSelect from "./UsaSelect";
import "./CaseAgeFilter.scss";

interface Props {
  caseSubstatus?: CaseSubstatusOptions;
  onUpdate: (caseSubstatus: CaseSubstatusOptions | undefined) => void;
}

interface Option {
  value: CaseSubstatusOptions | undefined;
  text: string;
}

const DEFAULT_TEXT = "All";
const OPTIONS: Option[] = [
  { text: DEFAULT_TEXT, value: undefined },
  { text: "ASC Appt. Completed", value: "ASC Appt. Completed" },
  { text: "ASC Appt. Requested", value: "ASC Appt. Requested" },
  { text: "ASC Appt. Scheduled", value: "ASC Appt. Scheduled" },
  { text: "Awaiting Decision Notice", value: "Awaiting Decision Notice" },
  {
    text: "Awaiting RFE Notice Generation",
    value: "Awaiting RFE Notice Generation"
  },
  { text: "Card Production Failed", value: "Card Production Failed" },
  { text: "In Process", value: "In Process" },
  {
    text: "Pending Biometric Fee Payment",
    value: "Pending Biometric Fee Payment"
  },
  { text: "Ready for Pre-Adjudication", value: "Ready for Pre-Adjudication" },
  { text: "Ready For Adjudication", value: "Ready For Adjudication" },
  { text: "Referred to Field Office", value: "Referred to Field Office" },
  { text: "Returning to Adjudications", value: "Returning to Adjudications" },
  { text: "RFE Response", value: "RFE Response" },
  {
    text: "Supervisory Review Completed",
    value: "Supervisory Review Completed"
  },
  {
    text: "Supervisory Review Requested",
    value: "Supervisory Review Requested"
  }
];

const CaseSubstatusFilter: React.FunctionComponent<Props> = props => {
  return (
    <React.Fragment>
      <UsaSelect
        options={OPTIONS}
        placeholder={DEFAULT_TEXT}
        name="caseSubstatus"
        selected={props.caseSubstatus}
        onChange={props.onUpdate}
        label="Case Substatus"
      />
    </React.Fragment>
  );
};

export { CaseSubstatusFilter };
