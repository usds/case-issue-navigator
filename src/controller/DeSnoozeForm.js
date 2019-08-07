import React, { useState } from "react";
import PropTypes from "prop-types";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

import { SNOOZE_OPTIONS } from "./config";

export default function DeSnoozeForm(props) {
  const rowData = props.rowData;
  const [inputState, updateInputs] = useState();

  const desnooze = e => {
    e.preventDefault();
    props.callback.deSnooze(rowData);
    props.callback.closeDialog();
  };

  const reSnooze = e => {
    e.preventDefault();
    props.callback.reSnooze(
      rowData,
      inputState.selectedOption,
      inputState.followUp
    );
    props.callback.closeDialog();
  };

  return (
    <form className="usa-form">
      <div>
        <h4>Re-snooze or update the snooze information for this case:</h4>
        <SnoozeInputs
          label="New snooze reason:"
          onChange={updateInputs}
          options={SNOOZE_OPTIONS}
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
