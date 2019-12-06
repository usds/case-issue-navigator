import React from "react";
import { SNOOZE_OPTIONS } from "../../controller/config";
import UsaSelect from "./UsaSelect";
import "./CaseAgeFilter.scss";

interface Props {
  snoozeReason?: SnoozeReason;
  snoozeState: SnoozeState;
  onUpdate: (snoozeReason: SnoozeReason | "") => void;
}

interface Option {
  value: SnoozeReason | "";
  text: string;
}

const DEFAULT_TEXT = "- Show all snooze reasons -";

const SnoozeReasonFilter: React.FunctionComponent<Props> = props => {
  if (props.snoozeState !== "SNOOZED") {
    return null;
  }

  const options: Option[] = [
    {
      value: "",
      text: DEFAULT_TEXT
    }
  ];
  Object.keys(SNOOZE_OPTIONS).forEach((snoozeReason: string) => {
    options.push({
      value: snoozeReason as SnoozeReason,
      text: SNOOZE_OPTIONS[snoozeReason as SnoozeReason].shortText
    });
  });
  return (
    <React.Fragment>
      <UsaSelect
        options={options}
        placeholder={DEFAULT_TEXT}
        name="snoozeReason"
        selected={props.snoozeReason ? props.snoozeReason : ""}
        onChange={props.onUpdate}
        label="Snooze Reason"
      />
    </React.Fragment>
  );
};

export { SnoozeReasonFilter };
