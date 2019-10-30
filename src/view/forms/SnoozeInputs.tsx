import React from "react";
import UsaSelect from "./UsaSelect";
import UsaTextInput from "./UsaTextInput";
import UsaNumberInput from "./UsaNumberInput";
import UsaTextArea from "./UsaTextArea";

interface Props {
  options: SnoozeOptionValue[];
  selectedOption: SnoozeOptionValue;
  followUpChange: (value: string) => void;
  snoozeReasonChange: (value: SnoozeReason) => void;
  caseIssueNotesChange: (value: string) => void;
  durationChange: (value?: number) => void;
  setError: (key: string, value: string) => void;
  deleteError: (key: string) => void;
  followUp: string;
  caseIssueNotes: string;
  duration: number | undefined;
}

SnoozeInputs.defaultProps = {
  prefix: "snooze"
};

export default function SnoozeInputs(props: Props) {
  const followUpFragment = () => {
    if (!props.selectedOption.followUp) {
      return null;
    }
    return (
      <UsaTextInput
        onChange={props.followUpChange}
        name="followUp"
        value={props.followUp}
        label={props.selectedOption.followUp}
      />
    );
  };

  return (
    <React.Fragment>
      <UsaSelect
        options={props.options.map(opt => ({
          ...opt,
          text: opt.snoozeReason
        }))}
        placeholder="- Select Reason -"
        name="snoozeReason"
        selected={props.selectedOption.value}
        onChange={props.snoozeReasonChange}
        label="Reason to snooze this case:"
      />
      {followUpFragment()}
      <UsaNumberInput
        onChange={props.durationChange}
        name="duration"
        value={props.duration}
        label="Snooze Duration (in days)"
        min={1}
        max={365}
        setError={props.setError}
        deleteError={props.deleteError}
        requiredText="Enter a number of days to snooze"
      />
      <UsaTextArea
        label="Case Issue Notes"
        name="caseIssueNotes"
        onChange={props.caseIssueNotesChange}
        value={props.caseIssueNotes}
      />
    </React.Fragment>
  );
}
