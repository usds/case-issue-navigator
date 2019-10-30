import React, { useState } from "react";
import UsaTextArea from "./UsaTextArea";
import UsaButton from "../util/UsaButton";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

export default function AddNoteInput(props: Props) {
  const [showNotes, setShowNotes] = useState(false);

  if (showNotes) {
    return (
      <UsaTextArea
        label="Case Issue Notes"
        name="caseIssueNotes"
        onChange={props.onChange}
        value={props.value}
      />
    );
  }
  return (
    <div>
      <UsaButton onClick={setShowNotes} buttonStyle="outline">
        Add a note
      </UsaButton>
    </div>
  );
}
