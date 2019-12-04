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

const SnoozeReasonFilter: React.FunctionComponent<Props> = props => {
  if (props.snoozeState !== "snoozed") {
    return null;
  }

  const options: Option[] = [
    {
      value: "",
      text: "- Show all snooze reasons -"
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
        placeholder="- Show all snooze reasons -"
        name="snoozeReason"
        selected={props.snoozeReason ? props.snoozeReason : ""}
        onChange={props.onUpdate}
        label="Filter by Snooze Reason"
      />
    </React.Fragment>
  );
};

export { SnoozeReasonFilter };
