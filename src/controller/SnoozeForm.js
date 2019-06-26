import React, {Component} from 'react';
import formConfig from "./config";
import SnoozeInputs from "../view/forms/SnoozeInputs";

class SnoozeForm extends Component {

    constructor(props) {
      super(props);
      this.state = {};
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
        return formConfig.snooze_options.find(opt=>opt.value === this.state['snooze-reason']);
    }

    snoozeDaysRequested() {
        return this.getSelectedOption().snooze_days;
    }
    deSnoozeCheck() {
        if(this.props.rowData.desnoozed) {
            const now = new Date(); // cheating!

            return (
                <div className="usa-alert usa-alert--warning usa-alert--slim">
                    <div className="usa-alert__body">
                        <p className="usa-alert__text">
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
          <SnoozeInputs
            onChange={this.formChange.bind(this)}
            options={formConfig.snooze_options}
            selectedOption={this.getSelectedOption()}
          />
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
