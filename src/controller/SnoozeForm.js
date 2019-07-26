import React, { Component } from "react";
import formConfig from "./config";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

class SnoozeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { snoozeInputs: {} };
  }

  formChange(snoozeState) {
    const stateSetter = { snoozeInputs: snoozeState };
    if (snoozeState.selectedOption !== null) {
      stateSetter._enabled = true;
    }
    this.setState(stateSetter);
  }

  formSubmit(e) {
    e.preventDefault(); // nobody wants an actual form submission
    this.props.callback.snooze(
      this.props.rowData,
      this.getSelectedOption(),
      this.state.snoozeInputs.followUp
    );
    this.props.callback.closeDialog();
  }

  getSelectedOption() {
    return this.state.snoozeInputs.selectedOption;
  }

  snoozeDaysRequested() {
    return this.getSelectedOption().snooze_days;
  }
  deSnoozeCheck() {
    if (this.props.rowData.desnoozed) {
      const now = new Date(); // cheating!

      return (
        <div className="usa-alert usa-alert--warning usa-alert--slim">
          <div className="usa-alert__body">
            <p className="usa-alert__text">
              Case was previously snoozed on {now.getMonth() + 1}/
              {now.getDate()}/{now.getFullYear()}. Reason given:{" "}
              {this.props.rowData.snooze_option.short_text}.
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
      buttonText =
        "Snooze for " + snooze_days + " day" + (snooze_days === 1 ? "" : "s");
    }
    return (
      <form className="usa-form">
        {this.deSnoozeCheck()}
        <SnoozeInputs
          onChange={this.formChange.bind(this)}
          options={formConfig.snooze_options}
          selectedOption={this.getSelectedOption()}
        />
        <UsaButton
          onClick={this.formSubmit.bind(this)}
          disabled={!this.state._enabled}
        >
          {buttonText}
        </UsaButton>
      </form>
    );
  }
}

export default SnoozeForm;
