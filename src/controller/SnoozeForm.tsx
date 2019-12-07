import React, { Component } from "react";
import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "./config";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import { UsaAlert } from "../view/util/UsaAlert";
import UsaButton from "../view/util/UsaButton";
import NoteUtils from "../utils/NoteUtils";
import DateUtils from "../utils/DateUtils";

interface Props {
  rowData?: Case;
  snooze: (receiptNumber: string, state: CallbackState) => void;
  closeDialog: () => void;
  caseType: SnoozeState;
}

type State = {
  fieldErrors: { [key: string]: string };
} & CallbackState;

class SnoozeForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fieldErrors: {},
      ...this.getSnoozeInformation()
    };
  }

  getSnoozeInformation(): CallbackState {
    if (
      this.props.caseType === "ACTIVE" ||
      !this.props.rowData ||
      !this.props.rowData.snoozeInformation
    ) {
      return {
        snoozeReason: SNOOZE_OPTIONS_SELECT[0].value,
        duration: SNOOZE_OPTIONS_SELECT[0].duration,
        followUp: "",
        caseIssueNotes: ""
      };
    }

    return {
      snoozeReason: this.props.rowData.snoozeInformation.snoozeReason,
      duration: DateUtils.numberOfDaysUntil(
        this.props.rowData.snoozeInformation.snoozeEnd
      ),
      followUp: SnoozeForm.getFollowUp(this.props.rowData),
      caseIssueNotes: ""
    };
  }

  static getFollowUp(rowData?: Case): string {
    if (!rowData || !rowData.snoozeInformation) {
      return "";
    }
    const subtype = SnoozeForm.getSubtype(
      rowData.snoozeInformation.snoozeReason
    );
    if (subtype === null) {
      return "";
    }
    const followUp = NoteUtils.getFollowUp(rowData.notes, subtype);
    return followUp ? followUp.content : "";
  }

  static getSubtype(snoozeReason: SnoozeReason): SubType | null {
    switch (snoozeReason) {
      case "assigned_case":
        return "assignee";
      case "technical_issue":
        return "troubleticket";
      case "fo_referral":
        return "fieldoffice";
    }
    return null;
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
    this.setState({
      duration: duration ? duration : 0
    });
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
    if (!duration) {
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
      <UsaAlert
        alertType="warning"
        text={
          <React.Fragment>
            Case was previously snoozed on {snoozeStart}. Reason given:{" "}
            {this.props.rowData.snoozeInformation.snoozeReason}.
          </React.Fragment>
        }
      />
    );
  }

  render() {
    return (
      <form className="usa-form">
        {this.props.caseType === "ACTIVE" ? (
          this.deSnoozeCheck()
        ) : (
          <h4>Re-snooze or update the snooze information for this case:</h4>
        )}
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
