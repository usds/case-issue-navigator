import React from "react";
import { SNOOZE_OPTIONS } from "../../controller/config";
import UsaSelect from "./UsaSelect";
import "./CaseAgeFilter.scss";

interface Props {
  snoozeReason?: SnoozeReason;
  snoozeState: SnoozeState;
  onUpdate: (snoozeReason: SnoozeReason | "all" | "unknown") => void;
}

interface Option {
  value: SnoozeReason | "all" | "unknown";
  text: string;
}

const DEFAULT_TEXT = "All problem cases";

const SnoozeReasonFilter: React.FunctionComponent<Props> = props => {
  const options: Option[] = [
    {
      value: "unknown",
      text: "Unknown"
    },
    {
      value: "all",
      text: DEFAULT_TEXT
    }
  ];
  Object.keys(SNOOZE_OPTIONS).forEach((snoozeReason: string) => {
    options.push({
      value: snoozeReason as SnoozeReason,
      text: SNOOZE_OPTIONS[snoozeReason as SnoozeReason].shortText
    });
  });

  const getSelected = () => {
    if (props.snoozeState === "ACTIVE") {
      return "all"
    } else if (props.snoozeReason ) {
      return props.snoozeReason
    } else {
      return "unkown"
    }
  }

  return (
    <React.Fragment>
      <UsaSelect
        options={options}
        placeholder={DEFAULT_TEXT}
        name="snoozeReason"
        selected={props.snoozeReason}
        onChange={props.onUpdate}
        label="Problem"
      />
    </React.Fragment>
  );
};

export { SnoozeReasonFilter };
