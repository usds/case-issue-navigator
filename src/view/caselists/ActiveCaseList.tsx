import React, { useState, useEffect } from "react";
import { CaseList } from "./CaseList";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { getHeaders } from "../util/getHeaders";
import SnoozeForm from "../../controller/SnoozeForm";
import { formatNotes } from "../util/formatNotes";
import RestAPIClient from "../../api/RestAPIClient";
import { DesnoozedWarning } from "../notifications/DesnoozedWarning";
import { trackEvent } from "../../matomo-setup";


interface Props {
  updateSummaryData: () => void,
  setError: React.Dispatch<APIError>,
  setNotification: React.Dispatch<React.SetStateAction<AppNotification>>,
  summary: Summary
}

interface RowData {
  receiptNumber: string;
}

const ActiveCaseList = (props: Props) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setNotification, setError, summary } = props;

  useEffect(() => {loadMoreCases()}, []);

  const snooze = async (rowData: RowData, snoozeOption: SnoozeOption) => {
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
      props.updateSummaryData();
      setNotification({
        message: `${rowData.receiptNumber} has been Snoozed for ${
          snoozeOption.duration
        } day${snoozeOption.duration !== 1 ? "s" : ""} due to ${
          snoozeOption.snoozeReason
        }.`,
        type: "success"
      });
      trackEvent("snooze", "createSnooze", snoozeOption.snoozeReason);
      return setCases(
        cases.filter(c => c.receiptNumber !== rowData.receiptNumber)
      );
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
    const receiptNumber = cases.length > 0 ? cases[cases.length - 1].receiptNumber : undefined;
    const response = await RestAPIClient.cases.getActive(receiptNumber);
    setIsLoading(false);

    if (response.succeeded) {
      setCases(previousCases => [...previousCases,...response.payload]);
      return;
    }

    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      setError(errorJson);
    } else {
      console.error(response);
    }
  }

  const callbacks = {
    snooze,
    toggleDetails
  };

  return (
    <React.Fragment>
      <DesnoozedWarning
        previouslySnoozedCases={summary.PREVIOUSLY_SNOOZED || 0}
      />
      <CaseList
        cases={cases}
        callbacks={callbacks}
        headers={getHeaders(I90_HEADERS, VIEWS.CASES_TO_WORK.TITLE)}
        isLoading={isLoading}
        ModalContent={SnoozeForm}
        totalCases={summary.CASES_TO_WORK}
        loadMoreCases={loadMoreCases}
      />
    </React.Fragment>
  );
};

export { ActiveCaseList };
