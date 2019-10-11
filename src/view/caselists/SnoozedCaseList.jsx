import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DeSnoozeForm from "../../controller/DeSnoozeForm";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { getHeaders } from "../util/getHeaders";
import { CaseList } from "./CaseList";
import { formatNotes } from "../util/formatNotes";
import RestAPIClient from "../../api/RestAPIClient";
import { trackEvent } from "../../matomo-setup";

const SnoozedCaseList = props => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { setNotification, setError, summary } = props;

  useEffect(() => {
    let cancelRequest = false;

    setIsLoading(true);
    (async page => {
      const response = await RestAPIClient.cases.getSnoozed(page);
      if (cancelRequest) {
        return;
      }

      if (response.succeeded) {
        setCases(previousCases => [...previousCases, ...response.payload]);
        return setIsLoading(false);
      }

      if (response.responseReceived) {
        const errorJson = await response.responseError.getJson();
        !cancelRequest && setError(errorJson);
      } else {
        console.error(response);
      }
    })(currentPage);

    return () => {
      cancelRequest = true;
    };
  }, [setCases, currentPage, setNotification, setError]);

  const reSnooze = async (rowData, snoozeOption) => {
    const notes = formatNotes(snoozeOption);
    const response = await RestAPIClient.cases.updateActiveSnooze(
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
              notes: response.payload.notes
            };
          }
          return snoozedCase;
        })
        .sort((a, b) => {
          return (
            new Date(a.snoozeInformation.snoozeEnd) -
            new Date() -
            (new Date(b.snoozeInformation.snoozeEnd) - new Date())
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

  const deSnooze = async rowData => {
    const response = await RestAPIClient.cases.deleteActiveSnooze(
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

  const toggleDetails = receiptNumber => {
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

  const callbacks = {
    reSnooze,
    deSnooze,
    toggleDetails
  };

  return (
    <CaseList
      cases={cases}
      callbacks={callbacks}
      view={VIEWS.SNOOZED_CASES.TITLE}
      headers={getHeaders(I90_HEADERS, VIEWS.SNOOZED_CASES.TITLE)}
      isLoading={isLoading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      ModalContent={DeSnoozeForm}
      totalCases={summary.SNOOZED_CASES}
    />
  );
};

SnoozedCaseList.propTypes = {
  setNotification: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired,
  updateSummaryData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

export { SnoozedCaseList };
