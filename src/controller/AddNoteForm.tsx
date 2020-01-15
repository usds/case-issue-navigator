import React, { useState } from "react";
import { formatNotes } from "../view/util/formatNotes";
import RestAPIClient from "../api/RestAPIClient";
import { ActionModal } from "../view/util/ActionModal";
import UsaButton from "../view/util/UsaButton";
import AddNoteInput from "../view/forms/AddNoteInput";
import DateUtils from "../utils/DateUtils";

interface Props {
  rowData: Case;
  getCaseDetails: () => void;
}

const AddNoteForm = (props: Props) => {
  const [showDialog, setDialog] = useState(false);
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
      // type caseting because Typescript interprets `""` as a `string` not the literal string `""`
      subreason: "" as "",
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
      closeModal();
      return;
    }
    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      // TODO: properally display this error to the user
      console.error(errorJson);
    } else {
      console.error(response);
    }
    closeModal();
  };

  const openModal = () => setDialog(true);
  const closeModal = () => setDialog(false);

  if (!rowData.snoozeInformation) {
    return null;
  }

  return (
    <React.Fragment>
      <ActionModal
        isOpen={showDialog}
        title={props.rowData.receiptNumber}
        closeModal={closeModal}
      >
        <form className="usa-form">
          <AddNoteInput onChange={setNote} value={note} defaultShow={true} />
          <UsaButton onClick={addNote}>Add Note</UsaButton>
        </form>
      </ActionModal>
      <UsaButton onClick={openModal} buttonStyle="unstyled">
        Add A Note
      </UsaButton>
    </React.Fragment>
  );
};

export { AddNoteForm };
