import React, { useState } from "react";
import { ActionModal } from "../view/util/ActionModal";
import UsaButton from "../view/util/UsaButton";
import NoteUtils from "../utils/NoteUtils";
import { SNOOZE_OPTIONS, SPECIFIC_TECHNICAL_ISSUES } from "./config";
import "./EndSnoozeForm.scss";

interface Props {
  rowData: Case;
  deSnooze: (receiptNumber: string) => void;
}

const EndSnoozeForm = ({ rowData, deSnooze }: Props) => {
  const [showDialog, setDialog] = useState(false);

  const desnooze = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!rowData) {
      console.error("resnooze called with out a vaild snooze option selected");
      return;
    }
    deSnooze(rowData.receiptNumber);
    closeModal();
  };

  const openModal = () => setDialog(true);
  const closeModal = () => setDialog(false);

  let followUp = null;
  if (rowData.snoozeInformation) {
    const subtype =
      rowData.snoozeInformation.snoozeReason === "record_analysis"
        ? null
        : "troubleticket";
    if (subtype) {
      followUp = NoteUtils.getFollowUp(rowData.notes, subtype);
    }
  }

  const specificIssue = NoteUtils.getFollowUp(rowData.notes, "subreason");
  let specificIssueText: string | null = null;
  if (specificIssue !== null) {
    const value = specificIssue.content;
    const option = SPECIFIC_TECHNICAL_ISSUES.find(i => i.value === value);
    if (option) {
      specificIssueText = option.text;
    }
  }
  return (
    <React.Fragment>
      <ActionModal
        isOpen={showDialog}
        title="Resolve Case"
        closeModal={closeModal}
      >
        <p style={{ marginBottom: "0px", paddingRight: "25px" }}>
          The following data will be removed <br />
          from case {rowData.receiptNumber}.
        </p>
        <ul>
          <li>
            Problem:{" "}
            {rowData.snoozeInformation
              ? SNOOZE_OPTIONS[rowData.snoozeInformation.snoozeReason].shortText
              : ""}
          </li>
          {specificIssueText ? (
            <li>Specific Issue: {specificIssueText}</li>
          ) : null}
          {followUp ? (
            <li>
              Service Now ticket ID:{" "}
              <a
                href={followUp.href ? followUp.href : undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                {followUp.content}
              </a>
            </li>
          ) : null}
        </ul>
        <div style={{ paddingTop: "15px" }}>
          <UsaButton onClick={desnooze}>Confirm</UsaButton>
        </div>
      </ActionModal>
      <div className="remove-button-margin">
        <UsaButton onClick={openModal} buttonStyle="secondary">
          Resolve
        </UsaButton>
      </div>
    </React.Fragment>
  );
};

export { EndSnoozeForm };
