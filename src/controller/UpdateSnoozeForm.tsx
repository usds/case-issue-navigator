import React from "react";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";
import NoteUtils from "../utils/NoteUtils";
import DateUtils from "../utils/DateUtils";

import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "./config";

interface Props {
  rowData?: Case;
  reSnooze: (receiptNumber: string, state: CallbackState) => void;
  closeDialog: () => void;
}

interface State {
  snoozeReason: SnoozeReason;
  followUp: string;
  caseIssueNotes: string;
  duration: number | undefined;
  fieldErrors: { [key: string]: string };
}

class UpdateSnoozeForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      followUp: UpdateSnoozeForm.getFollowUp(props.rowData),
      caseIssueNotes: "",
      ...UpdateSnoozeForm.snoozeInformation(props.rowData),
      fieldErrors: {}
    };
  }

  static snoozeInformation(rowData?: Case) {
    if (rowData && rowData.snoozeInformation) {
      return {
        snoozeReason: rowData.snoozeInformation.snoozeReason,
        duration: DateUtils.numberOfDaysUntil(
          rowData.snoozeInformation.snoozeEnd
        )
      };
    }
    return {
      snoozeReason: SNOOZE_OPTIONS_SELECT[0].value,
      duration: SNOOZE_OPTIONS_SELECT[0].duration
    };
  }

  static getSubtype(snoozeReason: SnoozeReason): SubType | null {
    switch (snoozeReason) {
      case "assigned_case":
        return "assignee";
      case "technical_issue":
        return "troubleticket";
      case "fo_referral":
        return "fieldoffice";
      case "bcu":
        return "referral";
    }
    return null;
  }

  static getFollowUp(rowData?: Case): string {
    if (!rowData || !rowData.snoozeInformation) {
      return "";
    }
    const subtype = UpdateSnoozeForm.getSubtype(
      rowData.snoozeInformation.snoozeReason
    );
    if (subtype === null) {
      return "";
    }
    const followUp = NoteUtils.getFollowUp(rowData.notes, subtype);
    return followUp ? followUp.content : "";
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

  getSelectedOption(): SnoozeOptionValue {
    return {
      ...SNOOZE_OPTIONS[this.state.snoozeReason],
      value: this.state.snoozeReason
    };
  }

  reSnooze(e: React.ChangeEvent<HTMLButtonElement>) {
    e.preventDefault();
    const snoozeOption = this.getSelectedOption();
    if (!snoozeOption || !this.props.rowData) {
      console.error("resnooze called with out a vaild snooze option selected");
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
    this.props.reSnooze(this.props.rowData.receiptNumber, {
      ...this.state,
      duration: duration
    });
    this.props.closeDialog();
  }

  render() {
    return (
      <form className="usa-form">
        <div>
          <h4>Re-snooze or update the snooze information for this case:</h4>
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
          <UsaButton onClick={this.reSnooze.bind(this)}>Save Snooze</UsaButton>
        </div>
      </form>
    );
  }
}

export default UpdateSnoozeForm;
