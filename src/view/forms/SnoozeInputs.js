import React from "react";
import PropTypes from "prop-types";

import UsaSelect from "./UsaSelect";
import UsaTextInput from "./UsaTextInput";
import UsaTextArea from "./UsaTextArea";

export default function SnoozeInputs(props) {
  const inputNames = {
    select: "snoozeReason",
    followUp: "snoozeFollowUp",
    caseIssueNotes: "caseIssueNotes"
  };

  const followUpFragment = props.selectedOption.followUp ? (
    <UsaTextInput
      onChange={props.changeHandlers.followUpChange}
      name="followUp"
      value={props.inputState.followUp}
      label={props.selectedOption.followUp}
    />
  ) : null;

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
        value={props.inputState.select}
      >
        Reason to snooze this case:
      </UsaSelect>
      {followUpFragment}
      {props.selectedOption && (
        <UsaTextArea
          label="Case Issue Notes"
          name={inputNames.caseIssueNotes}
          onChange={props.changeHandlers.caseIssueNotesChange}
          value={props.inputState.caseIssueNotes}
        />
      )}
    </React.Fragment>
  );
}

SnoozeInputs.propTypes = {
  followUp: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  selectedOption: PropTypes.object,
  changeHandlers: PropTypes.objectOf(PropTypes.func).isRequired,
  inputState: PropTypes.objectOf(PropTypes.string)
};

SnoozeInputs.defaultProps = {
  prefix: "snooze"
};
