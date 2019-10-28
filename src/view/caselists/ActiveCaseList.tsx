import React, { useState, useEffect } from "react";
import { CaseList } from "./CaseList";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { getHeaders } from "../util/getHeaders";
import SnoozeForm from "../../controller/SnoozeForm";
import { formatNotes } from "../util/formatNotes";
import RestAPIClient from "../../api/RestAPIClient";
import { DesnoozedWarning } from "../notifications/DesnoozedWarning";
import { trackEvent } from "../../matomo-setup";
import { ActionModal } from "../util/ActionModal";

interface Props {
  updateSummaryData: () => void;
  setError: React.Dispatch<APIError>;
  setNotification: React.Dispatch<React.SetStateAction<AppNotification>>;
  summary: Summary;
}

const ActiveCaseList = (props: Props) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState({
    show: false,
    title: ""
  });
  const [clickedRow, setClickedRow] = useState<Case>();

  const { setNotification, setError, summary } = props;

  useEffect(() => {
    loadMoreCases();
  }, []);

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
      return setCases(cases.filter(c => c.receiptNumber !== receiptNumber));
    }

    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      setError(errorJson);
    } else {
      console.error(response);
    }
  };

  const toggleDetails = (receiptNumber: string) => {
    setCases(cases =>
      cases.map(caseInformation => {
        if (caseInformation.receiptNumber === receiptNumber) {
          return {
            ...caseInformation,
            showDetails: !caseInformation.showDetails
          };
        }
        return caseInformation;
      })
    );
  };

  const loadMoreCases = async () => {
    setIsLoading(true);
    const receiptNumber =
      cases.length > 0 ? cases[cases.length - 1].receiptNumber : undefined;
    const response = await RestAPIClient.cases.getActive(receiptNumber);
    setIsLoading(false);

    if (response.succeeded) {
      setCases(previousCases => [...previousCases, ...response.payload]);
      return;
    }

    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      setError(errorJson);
    } else {
      console.error(response);
    }
  };

  const openModal = (rowData: Case) => {
    setClickedRow(rowData);
    setDialog({ show: true, title: rowData.receiptNumber });
  };

  const closeModal = () => setDialog({ show: false, title: "" });

  const callbacks = {
    snooze,
    toggleDetails
  };

  return (
    <React.Fragment>
      <DesnoozedWarning
        previouslySnoozedCases={summary.PREVIOUSLY_SNOOZED || 0}
      />
      <ActionModal
        isOpen={dialog.show}
        title={dialog.title}
        closeModal={closeModal}
      >
        <SnoozeForm
          snooze={snooze}
          closeDialog={closeModal}
          rowData={clickedRow}
        />
      </ActionModal>
      <CaseList
        cases={cases}
        callbacks={callbacks}
        headers={getHeaders(I90_HEADERS, "Cases to Work")}
        isLoading={isLoading}
        totalCases={summary.CASES_TO_WORK}
        loadMoreCases={loadMoreCases}
        openModal={openModal}
        closeModal={closeModal}
      />
    </React.Fragment>
  );
};

export { ActiveCaseList };
