import React, { useState } from "react";
import { ActionModal } from "../view/util/ActionModal";
import UsaButton from "../view/util/UsaButton";

interface Props {
  selectedCases: Case[];
  deSnooze: (receiptNumber: string) => void;
}

const EndSnoozeForm: React.FC<Props> = ({selectedCases, deSnooze}) => {
  const [showDialog, setDialog] = useState(false);

  const desnooze = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedCases.length < 1) {
      console.error("resnooze called with out a vaild snooze option selected");
      return;
    }
    selectedCases.forEach(c => {
      deSnooze(c.receiptNumber);
    });
    closeModal();
  };

  const openModal = () => setDialog(true);
  const closeModal = () => setDialog(false);

  return (
    <React.Fragment>
      <ActionModal
        isOpen={showDialog}
        title={"Resolve Cases"}
        closeModal={closeModal}
      >
        <p>Pleace confirm you want to resolve the following cases:</p>
        <ul>
          {selectedCases.map(c => <li>{c.receiptNumber}</li>)}
        </ul>
        <UsaButton onClick={desnooze} buttonStyle="secondary">
          Resolve
        </UsaButton>
      </ActionModal>
      <UsaButton onClick={openModal} buttonStyle="secondary">
        Resolve
      </UsaButton>
    </React.Fragment>
  );
};

export { EndSnoozeForm };
