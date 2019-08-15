import React, { Component } from "react";
import PropTypes from "prop-types";
import { SNOOZE_OPTIONS_SELECT } from "./config";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

class SnoozeForm extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    callback: PropTypes.objectOf(PropTypes.func).isRequired
  };

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
    this.props.callback.snooze(this.props.rowData, this.getSelectedOption());
    this.props.callback.closeDialog();
  }

  getSelectedOption() {
    return this.state.snoozeInputs.selectedOption;
  }

  snoozeDaysRequested() {
    return this.getSelectedOption().duration;
  }
  deSnoozeCheck() {
    if (this.props.rowData.previouslySnoozed) {
      const snoozeStart = new Date(
        this.props.rowData.snoozeInformation.snoozeStart
      ).toLocaleDateString("en-US");

      return (
        <div className="usa-alert usa-alert--warning usa-alert--slim">
          <div className="usa-alert__body">
            <p className="usa-alert__text">
              Case was previously snoozed on {snoozeStart}. Reason given:{" "}
              {this.props.rowData.snoozeInformation.snoozeReason}.
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
      const duration = selectedOption.duration;
      buttonText =
        "Snooze for " + duration + " day" + (duration === 1 ? "" : "s");
    }
    return (
      <form className="usa-form">
        {this.deSnoozeCheck()}
        <SnoozeInputs
          onChange={this.formChange.bind(this)}
          options={SNOOZE_OPTIONS_SELECT}
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
