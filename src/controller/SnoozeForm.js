import React, {Component} from 'react';

class SnoozeForm extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      this._TEMP_DURATIONS = [
        {
            value: "test_data",
            text: "Test Data",
            snooze_days: 365,
        },
        {
            value: "assigned_case",
            text: "Case has been assigned",
            snooze_days: 5,

        },
        {
            value: "in_proceedings",
            text: "Case is pending removal proceedings",
            snooze_days: 30,
        }
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
      this.props.callback.snooze(this.props.rowData, this.snoozeDaysRequested());
      this.props.callback.closeDialog();
    }

    snoozeDaysRequested() {
        return this._TEMP_DURATIONS.filter(opt=>opt.value === this.state['snooze-reason'])[0].snooze_days;
    }
    render() {
      let buttonText = "Select a Reason";
      if (this.state._enabled) {
        const snooze_days = this.snoozeDaysRequested();
        buttonText = "Snooze for " + snooze_days + " day" + (snooze_days === 1 ? "" : "s");
      }
      return (
        <form className="usa-form">
          <input id="how" className="usa-checkbox__input" type="checkbox" name="checkybox" value="not" />
          <label className="usa-checkbox__label" htmlFor="how">This is not how you do it</label>
          <label className  ="usa-label" htmlFor="snooze-reason">Reason to snooze this case:</label>
          <select defaultValue={false} onChange={this.formChange.bind(this)} required={true} className="usa-select" name="snooze-reason" id="snooze-reason">
            <option value={false} disabled={true}  hidden={true}>- Select Reason -</option>
            {
                this._TEMP_DURATIONS.map(opt=><option key={opt.value} value={opt.value}>{opt.text}</option>)
            }
          </select>
          <button
              onClick={this.formSubmit.bind(this)}
              className={"usa-button" + (this.state._enabled ? "" : " usa-button--disabled")}>
            {buttonText}
          </button>
        </form>
      );
    }
}

export default SnoozeForm;
