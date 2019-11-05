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

  const addNote = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!rowData.snoozeInformation) {
      // TODO
      return;
    }
    const duration = DateUtils.numberOfDaysUntil(
      rowData.snoozeInformation.snoozeEnd
    );
    const reason = rowData.snoozeInformation.snoozeReason;
    const snoozeOption = {
      snoozeReason: reason,
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
      {rowData.snoozeInformation ? (
        <UsaButton onClick={openModal} buttonStyle="unstyled">
          Add A Note
        </UsaButton>
      ) : null}
      {/*TODO remove ternary statement*/}
    </React.Fragment>
  );
};

export { AddNoteForm };
