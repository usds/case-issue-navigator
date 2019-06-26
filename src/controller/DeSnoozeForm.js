import React from 'react';
import SnoozeInputs from "../view/forms/SnoozeInputs";

import formConfig from "./config";

export default function DeSnoozeForm(props) {
    const rowData = props.rowData;
    const desnooze = (e) => {
      e.preventDefault();
      props.callback.deSnooze(rowData);
      props.callback.closeDialog();
    };
    /*
    const resnooze = (e) => {
      e.preventDefault();
      props.callback.reSnooze(rowData, this.getSelectedOption(), this.state["snooze-follow-up"]);
      props.callback.closeDialog();
    };
    */
    return (
      <form className="usa-form">
        <div>
            <h4>Re-snooze or update the snooze information for this case:</h4>
            <SnoozeInputs
                label="New snooze reason:"
                options={formConfig.snooze_options}
                selectedOption={rowData.snooze_option}
                followUp={rowData.snooze_followup}
            />
            <button onClick={e=>e.preventDefault()} className="usa-button usa-button--outline">Save Snooze</button>
            <hr />
        </div>
        <button
            onClick={desnooze}
            className={"usa-button usa-button--secondary"}>
                    End Current Snooze
        </button>
      </form>
    );
  }
