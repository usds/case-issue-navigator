import React from 'react';

import formConfig from "./config";

export default function DeSnoozeForm(props) {
    const rowData = props.rowData;
    const updateSubform = rowData.snooze_option.follow_up === undefined ? <></> : (
      <div>
        <label className="usa-label" htmlFor="snooze-follow-up">{rowData.snooze_option.follow_up}</label>
        <input className="usa-input" id="snooze-follow-up" name="snooze-follow-up" type="text" defaultValue={rowData.snooze_followup}></input>
        <button className="usa-button usa-button--cool-accent" onClick={(e)=>e.preventDefault()}>
              Update
        </button>
        <hr/>
      </div>
    );
    const desnooze = (e) => {
      e.preventDefault();
      props.callback.deSnooze(rowData);
      props.callback.closeDialog();
    };
    return (
      <form className="usa-form">
        {updateSubform}
        <button
            onClick={desnooze}
            className={"usa-button usa-button--secondary"}>
                    End Snooze
        </button>
      </form>
    );
  }
