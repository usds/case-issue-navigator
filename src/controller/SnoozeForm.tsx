import React, { Component } from "react";
import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "./config";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";

interface Props {
  rowData?: Case;
  snooze: (receiptNumber: string, state: CallbackState) => void;
  closeDialog: () => void;
}

interface State {
  snoozeReason: SnoozeReason;
  followUp: string;
  caseIssueNotes: string;
  duration: number | undefined;
  fieldErrors: { [key: string]: string };
}

class SnoozeForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const selectedOption = SNOOZE_OPTIONS_SELECT[0];
    this.state = {
      snoozeReason: selectedOption.value,
      followUp: "",
      caseIssueNotes: "",
      duration: selectedOption.duration,
      fieldErrors: {}
    };
  }

  snoozeReasonChange(snoozeReason: SnoozeReason) {
    const duration = SNOOZE_OPTIONS[snoozeReason].duration;
    this.setState({ snoozeReason, duration });
  }

  followUpChange(followUp: string) {
    this.setState({ followUp });
  }

  caseIssueNotesChange(caseIssueNotes: string) {
    this.setState({ caseIssueNotes });
  }

  durationChange(duration?: number) {
    this.setState({ duration });
  }

  setFieldError(key: string, value: string) {
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    fieldErrors[key] = value;
    this.setState({ fieldErrors });
  }

  deleteFieldError(key: string) {
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    delete fieldErrors[key];
    this.setState({ fieldErrors });
  }

  formSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!this.props.rowData) {
      console.error("snooze form submited with out case data");
      return;
    }
    const duration = this.state.duration;
    if (duration === undefined) {
      return;
    }
    const fieldErrors = Object.values(this.state.fieldErrors);
    if (fieldErrors.length > 0) {
      return;
    }
    this.props.snooze(this.props.rowData.receiptNumber, {
      duration,
      snoozeReason: this.state.snoozeReason,
      followUp: this.state.followUp,
      caseIssueNotes: this.state.caseIssueNotes
    });

    this.props.closeDialog();
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
    return (
      <form className="usa-form">
        {this.deSnoozeCheck()}
        <SnoozeInputs
          options={SNOOZE_OPTIONS_SELECT}
          selectedOption={this.getSelectedOption()}
          snoozeReasonChange={this.snoozeReasonChange.bind(this)}
          followUpChange={this.followUpChange.bind(this)}
          caseIssueNotesChange={this.caseIssueNotesChange.bind(this)}
          durationChange={this.durationChange.bind(this)}
          setError={this.setFieldError.bind(this)}
          deleteError={this.deleteFieldError.bind(this)}
          {...this.state}
        />
        <UsaButton buttonId="SnoozeSumbit" onClick={this.formSubmit.bind(this)}>
          Snooze
        </UsaButton>
      </form>
    );
  }
}

export default SnoozeForm;
