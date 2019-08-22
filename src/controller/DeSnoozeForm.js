import React, { useState } from "react";
import PropTypes from "prop-types";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

import { SNOOZE_OPTIONS_SELECT } from "./config";

export default function DeSnoozeForm(props) {
  const rowData = props.rowData;
  const [inputState, updateInputs] = useState({});

  const formChange = e => {
    updateInputs({
      ...inputState,
      [e.target.name]: e.target.value
    });
  };

  const getSelectedOption = () => {
    return SNOOZE_OPTIONS_SELECT.find(
      opt => opt.value === inputState.snoozeReason
    );
  };

  const desnooze = e => {
    e.preventDefault();
    props.callback.deSnooze(rowData);
    props.callback.closeDialog();
  };

  const reSnooze = e => {
    e.preventDefault();
    props.callback.reSnooze(rowData, getSelectedOption(), inputState);
    props.callback.closeDialog();
  };

  return (
    <form className="usa-form" onChange={formChange}>
      <div>
        <h4>Re-snooze or update the snooze information for this case:</h4>
        <SnoozeInputs
          label="New snooze reason:"
          options={SNOOZE_OPTIONS_SELECT}
          selectedOption={rowData.snoozeInformation}
          followUp={rowData.snooze_followup}
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
