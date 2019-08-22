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
    <UsaTextInput name="followUp">{props.selectedOption.followUp}</UsaTextInput>
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
      >
        Reason to snooze this case:
      </UsaSelect>
      {followUpFragment}
      {props.selectedOption && (
        <UsaTextArea
          label="Case Issue Notes"
          name={inputNames.caseIssueNotes}
        />
      )}
    </React.Fragment>
  );
}

SnoozeInputs.propTypes = {
  followUp: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  selectedOption: PropTypes.object
};

SnoozeInputs.defaultProps = {
  prefix: "snooze"
};
