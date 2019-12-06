import React from "react";
import UsaCheckbox from "./UsaCheckbox";
import "./SnooozeStateFilter.scss";

interface Props {
  snoozeState: SnoozeState;
  alarmedCases: number;
  onUpdate: (snoozeState: SnoozeState) => void;
}

const SnoozeStateFilter: React.FunctionComponent<Props> = props => {
  if (props.snoozeState === "SNOOZED") {
    return null;
  }

  const onChange = (value: boolean) => {
    if (value) {
      props.onUpdate("ALARMED");
    } else {
      props.onUpdate("ACTIVE");
    }
  };

  return (
    <div className="snooze-state-filter">
      <UsaCheckbox
        name="snoozeState"
        id="snoozeState"
        value={props.snoozeState === "ALARMED"}
        onChange={onChange}
        label={`Overdue Cases OInly`}
      />
    </div>
  );
};

export { SnoozeStateFilter };
