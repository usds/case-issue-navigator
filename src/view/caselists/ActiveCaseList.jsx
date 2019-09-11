import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CaseList } from "./CaseList";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { getHeaders } from "../util/getHeaders";
import SnoozeForm from "../../controller/SnoozeForm";
import { formatNotes } from "../util/formatNotes";
import RestAPIClient from "../../model/RestAPIClient";
import { UsaAlert } from "../util/UsaAlert";
import { DesnoozedWarning } from "../notifications/DesnoozedWarning";

const ActiveCaseList = props => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { setNotification, summary } = props;

  useEffect(() => {
    setIsLoading(true);
    (async page => {
      const response = await RestAPIClient.cases.getActive(page);
      setIsLoading(false);
      if (response.succeeded) {
        return setCases(previousCases => [
          ...previousCases,
          ...response.payload
        ]);
      }
      setNotification({
        message: "There was an error loading cases.",
        type: "error"
      });
      if (response.responseReceived) {
        const errorJson = await response.responseError.getJson();
        console.error(errorJson);
      }
    })(currentPage);
  }, [currentPage, setIsLoading, setNotification]);

  const snooze = async (rowData, snoozeOption) => {
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
      props.updateSummaryData();
      setNotification({
        message: `${rowData.receiptNumber} has been Snoozed for ${
          snoozeOption.duration
        } day${snoozeOption.duration !== 1 ? "s" : ""} due to ${
          snoozeOption.snoozeReason
        }.`,
        type: "success"
      });
      return setCases(
        cases.filter(c => c.receiptNumber !== rowData.receiptNumber)
      );
    }

    setNotification("There was an error updating the case.", "error");
    if (response.responseReceived) {
      const errorJson = await response.responseError.getJson();
      console.error(errorJson);
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
        view={VIEWS.CASES_TO_WORK.TITLE}
        headers={getHeaders(I90_HEADERS, VIEWS.CASES_TO_WORK.TITLE)}
        isLoading={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        ModalContent={SnoozeForm}
        totalCases={summary.CASES_TO_WORK}
      />
    </React.Fragment>
  );
};

ActiveCaseList.propTypes = {
  updateSummaryData: PropTypes.func,
  setNotification: PropTypes.func,
  summary: PropTypes.object.isRequired
};

export { ActiveCaseList };
