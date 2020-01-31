import React, { useState } from "react";
import { formatNotes } from "../view/util/formatNotes";
import RestAPIClient from "../api/RestAPIClient";
import { trackEvent } from "../matomo-setup";
import { ActionModal } from "../view/util/ActionModal";
import UsaButton from "../view/util/UsaButton";
import { ResolveForm } from "./ResolveForm";
import { RootState } from "../redux/create";
import { connect } from "react-redux";
import TriageForm from "./TriageForm";

const mapStateToProps = (state: RootState) => ({
  currentUser: state.appStatus.user
});

interface PassedProps extends SnoozeActionsProps {
  rowData: Case;
}

type Props = ReturnType<typeof mapStateToProps> & PassedProps;

const UpdateTriageFormWrapper: React.FC<Props> = ({
  setNotification,
  setError,
  currentUser,
  onSnoozeUpdate,
  updateSummaryData,
  removeCase,
  rowData
}) => {
  const [showDialog, setDialog] = useState(false);

  const reSnooze = async (
    receiptNumber: string,
    snoozeOption: CallbackState
  ) => {
    if (!currentUser) {
      console.error("Attemped resnooze with out a current user");
      return;
    }
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
      onSnoozeUpdate(receiptNumber, response.payload.notes, {
        snoozeEnd: response.payload.snoozeEnd,
        snoozeReason: response.payload.snoozeReason,
        snoozeStart: response.payload.snoozeStart,
        user: {
          name: currentUser.name,
          id: currentUser.id
        }
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
      updateSummaryData();
      removeCase(receiptNumber);
      trackEvent("snooze", "deSnooze", "desnoozed");
      setNotification({
        message: `${receiptNumber} has been resolved.`,
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
        title={`Update Case (${rowData.receiptNumber})`}
        closeModal={closeModal}
      >
        <TriageForm
          snooze={reSnooze}
          closeDialog={closeModal}
          rowData={rowData}
        />
      </ActionModal>
      <UsaButton onClick={openModal} buttonStyle="outline">
        Update
      </UsaButton>
      <ResolveForm rowData={rowData} deSnooze={deSnooze} />
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(UpdateTriageFormWrapper);
