import React, { useState } from "react";
import RestAPIClient from "../api/RestAPIClient";
import UsaButton from "../view/util/UsaButton";
import UsaTextInput from "../view/forms/UsaTextInput";
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
    const response = await RestAPIClient.caseDetails.addANote(
      rowData.receiptNumber,
      {
        type: "COMMENT",
        content: note,
        subType: null
      }
    );
    if (response.succeeded) {
      props.getCaseDetails();
      setNote("");
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

  return (
    <div className="add-note-form">
      <UsaTextInput name="caseIssueNotes" onChange={setNote} value={note} />
      <UsaButton onClick={addNote}>Add Note</UsaButton>
    </div>
  );
};

export { AddNoteForm };
