import React from "react";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import UsaButton from "../view/util/UsaButton";
import NoteUtils from "../utils/NoteUtils";

import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "./config";

interface Props {
  rowData?: Case;
  callback: {
    deSnooze: (troubleCase: Case | undefined) => void;
    reSnooze: (troubleCase: Case | undefined, state: CallbackState) => void;
    closeDialog: () => void;
  };
}

interface State {
  snoozeReason: SnoozeReason;
  followUp: string;
  caseIssueNotes: string;
}

class DeSnoozeForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const snoozeReason =
      props.rowData && props.rowData.snoozeInformation
        ? props.rowData.snoozeInformation.snoozeReason
        : SNOOZE_OPTIONS_SELECT[0].value;
    this.state = {
      snoozeReason,
      followUp: DeSnoozeForm.getFollowUp(props.rowData),
      caseIssueNotes: ""
    };
  }

  static getFollowUp(troubleCase?: Case): string {
    if (!troubleCase) {
      return "";
    }
    const assignee = NoteUtils.getAssignee(troubleCase.notes);
    return assignee ? assignee : "";
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

  getSelectedOption(): SnoozeOptionValue {
    return {
      ...SNOOZE_OPTIONS[this.state.snoozeReason],
      value: this.state.snoozeReason
    };
  }

  desnooze(e: React.ChangeEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.props.callback.deSnooze(this.props.rowData);
    this.props.callback.closeDialog();
  }

  reSnooze(e: React.ChangeEvent<HTMLButtonElement>) {
    e.preventDefault();
    const snoozeOption = this.getSelectedOption();
    if (!snoozeOption) {
      console.error("resnooze called with out a vaild snooze option selected");
      return;
    }
    this.props.callback.reSnooze(this.props.rowData, {
      ...this.state,
      duration: snoozeOption.duration
    });
    this.props.callback.closeDialog();
  }

  render() {
    return (
      <form className="usa-form">
        <div>
          <h4>Re-snooze or update the snooze information for this case:</h4>
          <SnoozeInputs
            options={SNOOZE_OPTIONS_SELECT}
            selectedOption={this.getSelectedOption()}
            changeHandlers={{
              snoozeReasonChange: this.snoozeReasonChange.bind(this),
              followUpChange: this.followUpChange.bind(this),
              caseIssueNotesChange: this.caseIssueNotesChange.bind(this)
            }}
            inputState={this.state}
          />
          <UsaButton onClick={this.reSnooze.bind(this)} buttonStyle="outline">
            Save Snooze
          </UsaButton>
          <hr />
        </div>
        <UsaButton onClick={this.desnooze.bind(this)} buttonStyle="secondary">
          End Current Snooze
        </UsaButton>
      </form>
    );
  }
}

export default DeSnoozeForm;
