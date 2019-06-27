import React, {useState} from 'react';
import SnoozeInputs from "../view/forms/SnoozeInputs";

import formConfig from "./config";

export default function DeSnoozeForm(props) {
    const rowData = props.rowData;
    const [inputState, updateInputs] = useState({
      "snooze-reason": rowData.snooze_option.value,
      "snooze-follow-up": rowData.snooze_followup
    });
    const changeHandler = (e) => {
      const newState = {...inputState};
      newState[e.target.name] = e.target.value;
      updateInputs(newState);
    };
    const desnooze = (e) => {
      e.preventDefault();
      props.callback.deSnooze(rowData);
      props.callback.closeDialog();
    };
    const getSelectedOption = () => formConfig.snooze_options.find(
      opt=>opt.value === inputState['snooze-reason']);
    const reSnooze = (e) => {
      e.preventDefault();
      const selectedOption = getSelectedOption()
      props.callback.reSnooze(rowData, selectedOption, inputState["snooze-follow-up"]);
      props.callback.closeDialog();
    };
    return (
      <form className="usa-form">
        <div>
            <h4>Re-snooze or update the snooze information for this case:</h4>
            <SnoozeInputs
                label="New snooze reason:"
                onChange={changeHandler}
                options={formConfig.snooze_options}
                selectedOption={getSelectedOption()}
                followUp={rowData.snooze_followup}
            />
            <button onClick={reSnooze} className="usa-button usa-button--outline">Save Snooze</button>
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
