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
  if (props.snoozeState === "ALARMED") {
    return null;
  }
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
      return "unknown";
    } else if (props.snoozeReason) {
      return props.snoozeReason;
    } else {
      return "all";
    }
  };

  return (
    <React.Fragment>
      <UsaSelect
        options={options}
        placeholder={DEFAULT_TEXT}
        name="snoozeReason"
        selected={getSelected()}
        onChange={props.onUpdate}
        label="Problem"
      />
    </React.Fragment>
  );
};

export { SnoozeReasonFilter };
