import React, { useState } from "react";
import { ActionModal } from "../view/util/ActionModal";
import UsaButton from "../view/util/UsaButton";

interface Props {
  rowData: Case;
  deSnooze: (receiptNumber: string) => void;
}

const EndSnoozeForm = (props: Props) => {
  const [showDialog, setDialog] = useState(false);

  const desnooze = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!props.rowData) {
      console.error("resnooze called with out a vaild snooze option selected");
      return;
    }
    props.deSnooze(props.rowData.receiptNumber);
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
        <UsaButton onClick={desnooze} buttonStyle="secondary">
          End Current Snooze
        </UsaButton>
      </ActionModal>
      <UsaButton onClick={openModal} buttonStyle="secondary">
        End
      </UsaButton>
    </React.Fragment>
  );
};

export { EndSnoozeForm };
