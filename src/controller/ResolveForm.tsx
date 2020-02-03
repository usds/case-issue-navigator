import React, { useState } from "react";
import { ActionModal } from "../view/util/ActionModal";
import UsaButton from "../view/util/UsaButton";
import { SNOOZE_OPTIONS } from "./config";
import "./ResolveForm.scss";
import CaseUtils from "../utils/CaseUtils";

interface Props {
  rowData: Case;
  deSnooze: (receiptNumber: string) => void;
}

const ResolveForm = ({ rowData, deSnooze }: Props) => {
  const [showDialog, setDialog] = useState(false);

  if (!CaseUtils.getProblem(rowData) || CaseUtils.isResolved(rowData)) {
    return null;
  }

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

  return (
    <React.Fragment>
      <ActionModal
        isOpen={showDialog}
        title="Resolve Case"
        closeModal={closeModal}
      >
        <p style={{ marginBottom: "0px", paddingRight: "25px" }}>
          Please confirm that the following issue has been resolved
        </p>
        <ul>
          <li>
            Problem:{" "}
            {rowData.snoozeInformation
              ? SNOOZE_OPTIONS[rowData.snoozeInformation.snoozeReason].shortText
              : ""}
          </li>
        </ul>
        <div style={{ paddingTop: "15px" }}>
          <UsaButton onClick={desnooze}>Confirm</UsaButton>
        </div>
      </ActionModal>
      <div className="remove-button-margin">
        <UsaButton onClick={openModal} buttonStyle="outline">
          Resolve
        </UsaButton>
      </div>
    </React.Fragment>
  );
};

export { ResolveForm };
