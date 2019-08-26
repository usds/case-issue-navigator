import React, { Component } from "react";
import PropTypes from "prop-types";
import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "./config";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

class SnoozeForm extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    callback: PropTypes.objectOf(PropTypes.func).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      snoozeReason: SNOOZE_OPTIONS_SELECT[0].value
    };
  }

  snoozeReasonChange(e) {
    this.setState({
      ...this.state,
      snoozeReason: e.target.value
    });
  }

  followUpChange(e) {
    this.setState({
      ...this.state,
      followUp: e.target.value
    });
  }

  caseIssueNotesChange(e) {
    this.setState({
      ...this.state,
      caseIssueNotes: e.target.value
    });
  }

  changeHandlers = {
    snoozeReasonChange: this.snoozeReasonChange.bind(this),
    followUpChange: this.followUpChange.bind(this),
    caseIssueNotesChange: this.caseIssueNotesChange.bind(this)
  };

  formSubmit(e) {
    e.preventDefault();
    this.props.callback.snooze(this.props.rowData, {
      ...this.state,
      duration: this.getSelectedOption().duration
    });

    this.props.callback.closeDialog();
  }

  getSelectedOption() {
    return SNOOZE_OPTIONS[this.state.snoozeReason];
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
    selectedOption = this.getSelectedOption();
    const duration = selectedOption.duration;
    buttonText =
      "Snooze for " + duration + " day" + (duration === 1 ? "" : "s");
    return (
      <form className="usa-form">
        {this.deSnoozeCheck()}
        <SnoozeInputs
          options={SNOOZE_OPTIONS_SELECT}
          selectedOption={this.getSelectedOption()}
          changeHandlers={this.changeHandlers}
          inputState={this.state}
        />
        <UsaButton onClick={this.formSubmit.bind(this)}>{buttonText}</UsaButton>
      </form>
    );
  }
}

export default SnoozeForm;
