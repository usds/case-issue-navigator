import React, {Component} from 'react';

class SnoozeForm extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      this._TEMP_DURATIONS = [
        {
            value: "test_data",
            text: "Test Data - should be deleted",
            short_text: "Test Data",
            snooze_days: 365,
        },
        {
            value: "assigned_case",
            text: "Case has been assigned - remind me later",
            short_text: "Assigned",
            snooze_days: 5,
            follow_up: "Who is the case being assigned to?"

        },
        {
            value: "in_proceedings",
            short_text: "In Proceedings",
            text: "Case is pending removal proceedings - check back later",
            snooze_days: 30,
        },
        {
            value: "fo_refferal",
            text: "Stuck at field office - awaiting response",
            short_text: "Field Office",
            follow_up: "Enter Field Office location code:",
            snooze_days: 5,
        },
        {
            value: "technical_issue",
            text: "Technical Issue - awaiting resolution through ServiceNow",
            short_text: "Technical Bug",
            follow_up: "ServiceNow ticket ID:",
            snooze_days: 14,
        },
      ];
    }

    formChange(e) {
      const stateSetter = {};
      stateSetter[e.target.name] = e.target.value;
      if (e.target.name === "snooze-reason") {
        stateSetter._enabled = true;
      }
      this.setState(stateSetter);
    }

    formSubmit(e) {
      e.preventDefault(); // nobody wants an actual form submission
      this.props.callback.snooze(this.props.rowData, this.getSelectedOption(), this.state["snooze-follow-up"]);
      this.props.callback.closeDialog();
    }

    getSelectedOption() {
        return this._TEMP_DURATIONS.find(opt=>opt.value === this.state['snooze-reason']);
    }

    snoozeDaysRequested() {
        return this.getSelectedOption().snooze_days;
    }
    deSnoozeCheck() {
        if(this.props.rowData.desnoozed) {
            const now = new Date(); // cheating!

            return (
                <div class="usa-alert usa-alert--warning usa-alert--slim">
                    <div class="usa-alert__body">
                        <p class="usa-alert__text">
                            Case was previously snoozed
                            on {now.getMonth()+1}/{now.getDate()}/{now.getFullYear()}.
                            Reason given: {this.props.rowData.snooze_option.short_text}.
                        </p>
                    </div>
                </div>
            );
        }
    }
    render() {
      let buttonText = "Select a Reason";
      let selectedOption = {};
      if (this.state._enabled) {
        selectedOption = this.getSelectedOption();
        const snooze_days = selectedOption.snooze_days;
        buttonText = "Snooze for " + snooze_days + " day" + (snooze_days === 1 ? "" : "s");
      }
      return (
        <form className="usa-form">
          {this.deSnoozeCheck()}
          <label className  ="usa-label" htmlFor="snooze-reason">Reason to snooze this case:</label>
          <select defaultValue={false} onChange={this.formChange.bind(this)} required={true} className="usa-select" name="snooze-reason" id="snooze-reason">
            <option value={false} disabled={true}  hidden={true}>- Select Reason -</option>
            {
                this._TEMP_DURATIONS.map(opt=><option key={opt.value} value={opt.value}>{opt.text}</option>)
            }
          </select>
          {_follow_up_entry(selectedOption)}
          <button
              onClick={this.formSubmit.bind(this)}
              className={"usa-button" + (this.state._enabled ? "" : " usa-button--disabled")}>
            {buttonText}
          </button>
        </form>
      );
    }
}

function _follow_up_entry(option) {
    if (option.follow_up === undefined) {
        return null;
    }
    return (
        <div>
            <label className="usa-label" htmlFor="snooze-follow-up">{option.follow_up}</label>
            <input className="usa-input" id="snooze-follow-up" name="snooze-follow-up" type="text"></input>
        </div>
    );
}

export default SnoozeForm;
