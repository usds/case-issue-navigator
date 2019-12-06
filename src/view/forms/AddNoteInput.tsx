import React, { useState } from "react";
import UsaTextArea from "./UsaTextArea";
import UsaButton from "../util/UsaButton";

interface Props {
  onChange: (value: string) => void;
  value: string;
  defaultShow?: boolean;
}

export default function AddNoteInput(props: Props) {
  const [showNotes, setShowNotes] = useState(props.defaultShow || false);

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
      <UsaButton
        buttonId="showNoteField"
        onClick={() => setShowNotes(true)}
        buttonStyle="outline"
      >
        Add a note
      </UsaButton>
    </div>
  );
}
