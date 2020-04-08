import React, { Component } from "react";
import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "./config";
import SnoozeInputs from "../view/forms/SnoozeInputs";
import { UsaAlert } from "../view/util/UsaAlert";
import UsaButton from "../view/util/UsaButton";
import NoteUtils from "../utils/NoteUtils";
import DateUtils from "../utils/DateUtils";
import CaseUtils from "../utils/CaseUtils";

interface Props {
  rowData?: Case;
  snooze: (receiptNumber: string, state: CallbackState) => void;
  closeDialog: () => void;
}

type State = {
  fieldErrors: { [key: string]: string };
} & CallbackState;

class TriageForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fieldErrors: {},
      ...this.getSnoozeInformation()
    };
  }

  getSubReason(
    snoozeReason: CaseProblem,
    notes: Note[] | undefined
  ): Subreason | undefined {
    if (snoozeReason !== "technical_issue") {
      return;
    }
    const subreason = NoteUtils.getFollowUp(notes, "subreason");
    return subreason ? (subreason.content as Subreason) : undefined;
  }

  getSnoozeInformation(): CallbackState {
    const { rowData } = this.props;
    if (
      !rowData ||
      !rowData.snoozeInformation ||
      !rowData.snoozeInformation.snoozeReason
    ) {
      return {
        snoozeReason: SNOOZE_OPTIONS_SELECT[0].value,
        subreason: undefined,
        duration: SNOOZE_OPTIONS_SELECT[0].duration,
        followUp: "",
        caseIssueNotes: ""
      };
    }

    const snoozeReason = rowData.snoozeInformation.snoozeReason;
    return {
      snoozeReason: snoozeReason,
      subreason: this.getSubReason(snoozeReason, rowData.notes),
      duration: CaseUtils.isOverDue(rowData)
        ? SNOOZE_OPTIONS[snoozeReason] !== undefined
          ? SNOOZE_OPTIONS[snoozeReason].duration
          : SNOOZE_OPTIONS_SELECT[0].duration
        : DateUtils.numberOfDaysUntil(rowData.snoozeInformation.snoozeEnd),
      followUp: TriageForm.getFollowUp(rowData),
      caseIssueNotes: ""
    };
  }

  static getFollowUp(rowData?: Case): string {
    if (!rowData || !rowData.snoozeInformation) {
      return "";
    }
    const subtype =
      rowData.snoozeInformation.snoozeReason === "record_analysis"
        ? null
        : "troubleticket";
    if (!subtype) {
      return "";
    }
    const followUp = NoteUtils.getFollowUp(rowData.notes, subtype);
    return followUp ? followUp.content : "";
  }

  snoozeReasonChange(snoozeReason: CaseProblem) {
    const duration = SNOOZE_OPTIONS[snoozeReason].duration;
    this.setState({ snoozeReason, duration });
  }

  subReasonChange(subreason: Subreason) {
    this.setState({ subreason });
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
      subreason: this.state.subreason,
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
    const c = this.props.rowData;
    if (!c || !CaseUtils.isOverDue(c)) {
      return null;
    }
    const triagedOn = CaseUtils.getTriagedOn(c);
    const problem = CaseUtils.getProblem(c);
    if (!triagedOn || !problem) {
      return null;
    }
    return (
      <UsaAlert
        alertType="warning"
        text={
          <React.Fragment>
            Previously triaged on:{" "}
            {new Date(triagedOn).toLocaleDateString("en-US")}.<br />
            Problem given: {CaseUtils.getProblemShortText(c)}.
          </React.Fragment>
        }
      />
    );
  }

  render() {
    return (
      <form className="usa-form">
        {this.deSnoozeCheck()}
        <SnoozeInputs
          options={SNOOZE_OPTIONS_SELECT}
          selectedOption={this.getSelectedOption()}
          subreasonChange={this.subReasonChange.bind(this)}
          snoozeReasonChange={this.snoozeReasonChange.bind(this)}
          followUpChange={this.followUpChange.bind(this)}
          caseIssueNotesChange={this.caseIssueNotesChange.bind(this)}
          durationChange={this.durationChange.bind(this)}
          setError={this.setFieldError.bind(this)}
          deleteError={this.deleteFieldError.bind(this)}
          {...this.state}
        />
        <UsaButton buttonId="SnoozeSumbit" onClick={this.formSubmit.bind(this)}>
          Save
        </UsaButton>
      </form>
    );
  }
}

export default TriageForm;
