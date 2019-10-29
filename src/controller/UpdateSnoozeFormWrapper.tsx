import React, { useState } from "react";
import UpdateSnoozeForm from "./UpdateSnoozeForm";
import { formatNotes } from "../view/util/formatNotes";
import RestAPIClient from "../api/RestAPIClient";
import { trackEvent } from "../matomo-setup";
import { ActionModal } from "../view/util/ActionModal";
import UsaButton from "../view/util/UsaButton";
import { EndSnoozeForm } from "./EndSnoozeForm";

interface Props extends SnoozeActionsProps {
  rowData: Case;
}

const UpdateSnoozeFormWrapper = (props: Props) => {
  const [showDialog, setDialog] = useState(false);

  const { setNotification, setError } = props;

  const reSnooze = async (
    receiptNumber: string,
    snoozeOption: CallbackState
  ) => {
    const notes = formatNotes(snoozeOption);
    const response = await RestAPIClient.caseDetails.updateActiveSnooze(
      receiptNumber,
      {
        duration: snoozeOption.duration,
        reason: snoozeOption.snoozeReason,
        notes
      }
    );

    if (response.succeeded) {
      setNotification({
        message: `${receiptNumber} has been Snoozed for ${
          snoozeOption.duration
        } day${snoozeOption.duration !== 1 ? "s" : ""} due to ${
          snoozeOption.snoozeReason
        }.`,
        type: "success"
      });
      trackEvent("snooze", "reSnooze", snoozeOption.snoozeReason);
      props.onSnoozeUpdate(receiptNumber, response.payload.notes, {
        snoozeEnd: response.payload.snoozeEnd,
        snoozeReason: response.payload.snoozeReason,
        snoozeStart: response.payload.snoozeStart
      });
      return;
    }

    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      setError(errorJson);
    } else {
      console.error(response);
    }
  };

  const deSnooze = async (receiptNumber: string) => {
    const response = await RestAPIClient.caseDetails.deleteActiveSnooze(
      receiptNumber
    );

    if (response.succeeded) {
      props.updateSummaryData();
      props.removeCase(receiptNumber);
      trackEvent("snooze", "deSnooze", "desnoozed");
      setNotification({
        message: `${receiptNumber} has been Unsnoozed.`,
        type: "info"
      });
      return;
    }

    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      setError(errorJson);
    } else {
      console.error(response);
    }
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
        <UpdateSnoozeForm
          reSnooze={reSnooze}
          closeDialog={closeModal}
          rowData={props.rowData}
        />
      </ActionModal>
      <UsaButton onClick={openModal} buttonStyle="outline">
        Update
      </UsaButton>
      <EndSnoozeForm rowData={props.rowData} deSnooze={deSnooze} />
    </React.Fragment>
  );
};

export { UpdateSnoozeFormWrapper };
