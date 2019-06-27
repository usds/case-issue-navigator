import React, {useState} from 'react';
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

import formConfig from "./config";

export default function DeSnoozeForm(props) {
    const rowData = props.rowData;
    const [inputState, updateInputs] = useState();

    const desnooze = (e) => {
      e.preventDefault();
      props.callback.deSnooze(rowData);
      props.callback.closeDialog();
    };

    const reSnooze = (e) => {
      e.preventDefault();
      props.callback.reSnooze(rowData, inputState.selectedOption, inputState.followUp);
      props.callback.closeDialog();
    };

    return (
      <form className="usa-form">
        <div>
            <h4>Re-snooze or update the snooze information for this case:</h4>
            <SnoozeInputs
                label="New snooze reason:"
                onChange={updateInputs}
                options={formConfig.snooze_options}
                selectedOption={rowData.snooze_option}
                followUp={rowData.snooze_followup}
            />
            <UsaButton onClick={reSnooze} buttonStyle="outline">Save Snooze</UsaButton>
            <hr />
        </div>
        <UsaButton onClick={desnooze} buttonStyle="secondary">
                    End Current Snooze
        </UsaButton>
      </form>
    );
  }
