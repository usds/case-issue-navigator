import React, { useState } from "react";
import SnoozeForm from "./SnoozeForm";
import { formatNotes } from "../view/util/formatNotes";
import RestAPIClient from "../api/RestAPIClient";
import { trackEvent } from "../matomo-setup";
import { ActionModal } from "../view/util/ActionModal";
import UsaButton from "../view/util/UsaButton";

interface Props extends ActionsProps {
  recipetNumbers: string[];
}

const SnoozeFormWrapper = (props: Props) => {
  const [dialog, setDialog] = useState({
    show: false,
    title: ""
  });

  const { setNotification, setError } = props;

  const snooze = async (receiptNumber: string, snoozeOption: CallbackState) => {
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
      props.updateSummaryData();
      setNotification({
        message: `${receiptNumber} has been Snoozed for ${
          snoozeOption.duration
        } day${snoozeOption.duration !== 1 ? "s" : ""} due to ${
          snoozeOption.snoozeReason
        }.`,
        type: "success"
      });
      trackEvent("snooze", "createSnooze", snoozeOption.snoozeReason);
      props.removeCase(receiptNumber);
      return;
    }

    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      setError(errorJson);
    } else {
      console.error(response);
    }
  };

  const openModal = () => {
    setDialog({ show: true, title: "Triage Case" });
  };

  const closeModal = () => setDialog({ show: false, title: "" });

  return (
    <React.Fragment>
      <ActionModal
        isOpen={dialog.show}
        title={dialog.title}
        closeModal={closeModal}
      >
        <SnoozeForm
          snooze={snooze}
          closeDialog={closeModal}
          recipetNumbers={props.recipetNumbers}
          caseType="ACTIVE"
        />
      </ActionModal>
      <UsaButton onClick={openModal} buttonStyle="outline">
        Triage
      </UsaButton>
    </React.Fragment>
  );
};

export { SnoozeFormWrapper };
