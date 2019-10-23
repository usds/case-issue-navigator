import React, { useState, useEffect } from "react";
import DeSnoozeForm from "../../controller/DeSnoozeForm";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { getHeaders } from "../util/getHeaders";
import { CaseList } from "./CaseList";
import { formatNotes } from "../util/formatNotes";
import RestAPIClient from "../../api/RestAPIClient";
import { trackEvent } from "../../matomo-setup";

interface Props {
  updateSummaryData: () => void;
  setError: React.Dispatch<APIError>;
  setNotification: React.Dispatch<React.SetStateAction<AppNotification>>;
  summary: Summary;
}

interface RowData {
  receiptNumber: string;
}

const SnoozedCaseList = (props: Props) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setNotification, setError, summary } = props;

  useEffect(() => {
    loadMoreCases();
  }, []);

  const reSnooze = async (rowData: RowData, snoozeOption: SnoozeOption) => {
    const notes = formatNotes(snoozeOption);
    const response = await RestAPIClient.caseDetails.updateActiveSnooze(
      rowData.receiptNumber,
      {
        duration: snoozeOption.duration,
        reason: snoozeOption.snoozeReason,
        notes
      }
    );

    if (response.succeeded) {
      setNotification({
        message: `${rowData.receiptNumber} has been Snoozed for ${
          snoozeOption.duration
        } day${snoozeOption.duration !== 1 ? "s" : ""} due to ${
          snoozeOption.snoozeReason
        }.`,
        type: "success"
      });
      trackEvent("snooze", "reSnooze", snoozeOption.snoozeReason);
      const snoozedCases = cases
        .map(snoozedCase => {
          if (snoozedCase.receiptNumber === rowData.receiptNumber) {
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
        snoozedCases[snoozedCases.length - 1].receiptNumber ===
          rowData.receiptNumber &&
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

  const deSnooze = async (rowData: RowData) => {
    const response = await RestAPIClient.caseDetails.deleteActiveSnooze(
      rowData.receiptNumber
    );

    if (response.succeeded) {
      props.updateSummaryData();
      setCases(
        cases.filter(
          snoozedCase => snoozedCase.receiptNumber !== rowData.receiptNumber
        )
      );
      trackEvent("snooze", "deSnooze", "desnoozed");
      return setNotification({
        message: `${rowData.receiptNumber} has been Unsnoozed.`,
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

  const callbacks = {
    reSnooze,
    deSnooze,
    toggleDetails
  };

  return (
    <CaseList
      cases={cases}
      callbacks={callbacks}
      headers={getHeaders(I90_HEADERS, VIEWS.SNOOZED_CASES.TITLE)}
      isLoading={isLoading}
      loadMoreCases={loadMoreCases}
      ModalContent={DeSnoozeForm}
      totalCases={summary.SNOOZED_CASES}
    />
  );
};

export { SnoozedCaseList };
