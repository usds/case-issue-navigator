import React, { useState } from "react";
import { formatNotes } from "../view/util/formatNotes";
import RestAPIClient from "../api/RestAPIClient";
import UsaButton from "../view/util/UsaButton";
import UsaTextInput from "../view/forms/UsaTextInput";
import DateUtils from "../utils/DateUtils";
import "./AddNoteForm.scss";

interface Props {
  rowData: Case;
  getCaseDetails: () => void;
}

const AddNoteForm = (props: Props) => {
  const [note, setNote] = useState("");

  const { rowData } = props;

  const addNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!rowData.snoozeInformation) {
      return;
    }
    const duration = DateUtils.numberOfDaysUntil(
      rowData.snoozeInformation.snoozeEnd
    );
    const reason = rowData.snoozeInformation.snoozeReason;
    const snoozeOption = {
      snoozeReason: reason,
      subreason: undefined,
      followUp: "",
      caseIssueNotes: note,
      duration
    };
    const notes = formatNotes(snoozeOption);
    const response = await RestAPIClient.caseDetails.updateActiveSnooze(
      rowData.receiptNumber,
      { duration, reason, notes }
    );
    if (response.succeeded) {
      props.getCaseDetails();
      return;
    }
    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      // TODO: properally display this error to the user
      console.error(errorJson);
    } else {
      console.error(response);
    }
  };

  if (!rowData.snoozeInformation) {
    return null;
  }

  return (
    <div className="add-note-form">
      <UsaTextInput name="caseIssueNotes" onChange={setNote} value={note} />
      <UsaButton onClick={addNote}>Add Note</UsaButton>
    </div>
  );
};

export { AddNoteForm };
