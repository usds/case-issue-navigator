import React, { Component } from "react";
import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "./config";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

interface Props {
  rowData?: Case;
  callback: Callbacks;
}

interface State {
  snoozeReason: SnoozeReason;
  followUp: string;
  caseIssueNotes: string;
}

class SnoozeForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      snoozeReason: SNOOZE_OPTIONS_SELECT[0].value,
      followUp: "",
      caseIssueNotes: ""
    };
  }

  snoozeReasonChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ snoozeReason: e.target.value as SnoozeReason });
  }

  followUpChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ followUp: e.target.value });
  }

  caseIssueNotesChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ caseIssueNotes: e.target.value });
  }

  changeHandlers = {
    snoozeReasonChange: this.snoozeReasonChange.bind(this),
    followUpChange: this.followUpChange.bind(this),
    caseIssueNotesChange: this.caseIssueNotesChange.bind(this)
  };

  formSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.props.callback.snooze(this.props.rowData, {
      ...this.state,
      duration: this.getSelectedOption().duration
    });

    this.props.callback.closeDialog();
  }

  getSelectedOption(): SnoozeOptionValue {
    return {
      ...SNOOZE_OPTIONS[this.state.snoozeReason],
      value: this.state.snoozeReason
    };
  }

  deSnoozeCheck() {
    if (!this.props.rowData) {
      return;
    }
    if (!this.props.rowData.previouslySnoozed) {
      return;
    }
    if (!this.props.rowData.snoozeInformation) {
      console.error(
        "Missing snooze information when previously snoozed",
        this.props.rowData.previouslySnoozed
      );
      return;
    }
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

  render() {
    const selectedOption = this.getSelectedOption();
    const duration = selectedOption.duration;
    const buttonText =
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
