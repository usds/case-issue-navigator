import React, { useState } from "react";
import PropTypes from "prop-types";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "./config";

export default function DeSnoozeForm(props) {
  const { rowData } = props;
  const [inputState, updateInputs] = useState({
    snoozeReason: SNOOZE_OPTIONS_SELECT[0].value
  });

  const snoozeReasonChange = e => {
    updateInputs({
      ...inputState,
      snoozeReason: e.target.value
    });
  };
  const followUpChange = e =>
    updateInputs({
      ...inputState,
      followUp: e.target.value
    });

  const caseIssueNotesChange = e =>
    updateInputs({
      ...inputState,
      caseIssueNotes: e.target.value
    });

  const changeHandlers = {
    snoozeReasonChange,
    followUpChange,
    caseIssueNotesChange
  };

  const getSelectedOption = () => {
    return SNOOZE_OPTIONS[inputState.snoozeReason] || {};
  };

  const desnooze = e => {
    e.preventDefault();
    props.callback.deSnooze(rowData);
    props.callback.closeDialog();
  };

  const reSnooze = e => {
    e.preventDefault();
    props.callback.reSnooze(rowData, {
      ...inputState,
      duration: getSelectedOption().duration
    });
    props.callback.closeDialog();
  };

  return (
    <form className="usa-form">
      <div>
        <h4>Re-snooze or update the snooze information for this case:</h4>
        <SnoozeInputs
          label="New snooze reason:"
          options={SNOOZE_OPTIONS_SELECT}
          selectedOption={getSelectedOption()}
          changeHandlers={changeHandlers}
          inputState={inputState}
        />
        <UsaButton onClick={reSnooze} buttonStyle="outline">
          Save Snooze
        </UsaButton>
        <hr />
      </div>
      <UsaButton onClick={desnooze} buttonStyle="secondary">
        End Current Snooze
      </UsaButton>
    </form>
  );
}

DeSnoozeForm.propTypes = {
  rowData: PropTypes.object.isRequired,
  callback: PropTypes.objectOf(PropTypes.func).isRequired
};
