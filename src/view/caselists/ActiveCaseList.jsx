import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CaseList } from "./CaseList";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { approximateDays } from "../util/approximateDays";
import caseFetcher from "../../model/caseFetcher";
import { getHeaders } from "../util/getHeaders";
import SnoozeForm from "../../controller/SnoozeForm";
import { formatNotes } from "../util/formatNotes";
import RestAPIClient from "../../model/RestAPIClient";

const ActiveCaseList = props => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { setNotification } = props;

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
      const errorJson = await response.responseError.getJson();
      console.error(errorJson);
    })(currentPage);
  }, [currentPage, setIsLoading, setNotification]);

  const snooze = async (rowData, snoozeOption) => {
    const notes = formatNotes(snoozeOption);
    try {
      const snoozeData = await caseFetcher.updateActiveSnooze(
        rowData.receiptNumber,
        {
          duration: snoozeOption.duration,
          reason: snoozeOption.snoozeReason,
          notes
        }
      );

      const snoozeDays = approximateDays({
        startDate: snoozeData.snoozeStart,
        endDate: snoozeData.snoozeEnd
      });

      props.updateSummaryData();
      setNotification({
        message: `${
          rowData.receiptNumber
        } has been Snoozed for ${snoozeDays} day${snoozeDays !== 1 &&
          "s"} due to ${snoozeData.snoozeReason}.`,
        type: "success"
      });

      setCases(cases.filter(c => c.receiptNumber !== rowData.receiptNumber));
    } catch (e) {
      console.error(e.message);
      setNotification({ message: e.message, type: "error" });
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
    <CaseList
      cases={cases}
      callbacks={callbacks}
      view={VIEWS.CASES_TO_WORK.TITLE}
      headers={getHeaders(I90_HEADERS, VIEWS.CASES_TO_WORK.TITLE)}
      isLoading={isLoading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      ModalContent={SnoozeForm}
    />
  );
};

ActiveCaseList.propTypes = {
  updateSummaryData: PropTypes.func,
  setNotification: PropTypes.func
};

export { ActiveCaseList };
