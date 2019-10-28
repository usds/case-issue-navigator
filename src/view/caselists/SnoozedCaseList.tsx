import React, { useState, useEffect } from "react";
import DeSnoozeForm from "../../controller/DeSnoozeForm";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { getHeaders } from "../util/getHeaders";
import { CaseList } from "./CaseList";
import { formatNotes } from "../util/formatNotes";
import RestAPIClient from "../../api/RestAPIClient";
import { trackEvent } from "../../matomo-setup";
import { ActionModal } from "../util/ActionModal";

interface Props {
  updateSummaryData: () => void;
  setError: React.Dispatch<APIError>;
  setNotification: React.Dispatch<React.SetStateAction<AppNotification>>;
  summary: Summary;
}

const SnoozedCaseList = (props: Props) => {
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
      const snoozedCases = cases
        .map(snoozedCase => {
          if (snoozedCase.receiptNumber === receiptNumber) {
            return {
              ...snoozedCase,
              snoozeInformation: response.payload,
              notes: snoozedCase.notes.concat(response.payload.notes)
            };
          }
          return snoozedCase;
        })
        .sort((a, b) => {
          return (
            new Date(
              (a.snoozeInformation as SnoozeInformation).snoozeEnd
            ).getTime() -
            new Date().getTime() -
            (new Date(
              (b.snoozeInformation as SnoozeInformation).snoozeEnd
            ).getTime() -
              new Date().getTime())
          );
        });

      if (
        snoozedCases[snoozedCases.length - 1].receiptNumber === receiptNumber &&
        snoozedCases.length < summary["SNOOZED_CASES"]
      ) {
        snoozedCases.pop();
      }

      return setCases(snoozedCases);
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
      setCases(
        cases.filter(snoozedCase => snoozedCase.receiptNumber !== receiptNumber)
      );
      trackEvent("snooze", "deSnooze", "desnoozed");
      return setNotification({
        message: `${receiptNumber} has been Unsnoozed.`,
        type: "info"
      });
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
    const response = await RestAPIClient.cases.getSnoozed(receiptNumber);
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
    reSnooze,
    deSnooze,
    toggleDetails
  };

  return (
    <React.Fragment>
      <ActionModal
        isOpen={dialog.show}
        title={dialog.title}
        closeModal={closeModal}
      >
        <DeSnoozeForm
          deSnooze={deSnooze}
          reSnooze={reSnooze}
          closeDialog={closeModal}
          rowData={clickedRow}
        />
      </ActionModal>
      <CaseList
        cases={cases}
        callbacks={callbacks}
        headers={getHeaders(I90_HEADERS, "Snoozed Cases")}
        isLoading={isLoading}
        loadMoreCases={loadMoreCases}
        totalCases={summary.SNOOZED_CASES}
        openModal={openModal}
        closeModal={closeModal}
      />
    </React.Fragment>
  );
};

export { SnoozedCaseList };
