import React from "react";
import UsaSelect from "./UsaSelect";
import UsaTextInput from "./UsaTextInput";
import UsaTextArea from "./UsaTextArea";

interface Props {
  followUp?: string;
  options: SnoozeOptionValue[];
  selectedOption: SnoozeOptionValue;
  changeHandlers: {
    followUpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    snoozeReasonChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    caseIssueNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  inputState: { [key: string]: string };
}

SnoozeInputs.defaultProps = {
  prefix: "snooze"
};

export default function SnoozeInputs(props: Props) {
  const inputNames = {
    select: "snoozeReason",
    followUp: "snoozeFollowUp",
    caseIssueNotes: "caseIssueNotes"
  };

  const followUpFragment = () => {
    if (!props.selectedOption.followUp) {
      return null;
    }
    return (
      <UsaTextInput
        onChange={props.changeHandlers.followUpChange}
        name="followUp"
        value={props.inputState.followUp}
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
        name={inputNames.select}
        selected={props.selectedOption.value}
        onChange={props.changeHandlers.snoozeReasonChange}
        label="Reason to snooze this case:"
      />
      {followUpFragment()}
      <UsaTextArea
        label="Case Issue Notes"
        name={inputNames.caseIssueNotes}
        onChange={props.changeHandlers.caseIssueNotesChange}
        value={props.inputState.caseIssueNotes}
      />
    </React.Fragment>
  );
}
