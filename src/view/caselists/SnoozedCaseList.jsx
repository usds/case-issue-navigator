import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DeSnoozeForm from "../../controller/DeSnoozeForm";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { getHeaders } from "../util/getHeaders";
import { CaseList } from "./CaseList";
import caseFetcher from "../../model/caseFetcher";
import { approximateDays } from "../util/approximateDays";
import { formatNotes } from "../util/formatNotes";

const SnoozedCaseList = props => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { setNotification } = props;

  useEffect(() => {
    setIsLoading(true);
    caseFetcher
      .getSnoozedCases(currentPage)
      .then(data => {
        setCases(previousCases => [...previousCases, ...data]);
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e.message);
        setIsLoading(false);
        setNotification({
          message: "There was an error loading cases.",
          type: "error"
        });
      });
  }, [setCases, currentPage, setNotification]);

  const reSnooze = async (rowData, snoozeOption) => {
    const notes = formatNotes(snoozeOption);
    try {
      // TODO: notes[].timestamp is null
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

      setNotification({
        message: `${
          rowData.receiptNumber
        } has been Snoozed for ${snoozeDays} day${snoozeDays !== 1 &&
          "s"} due to ${snoozeData.snoozeReason}.`,
        type: "success"
      });
      const snoozedCases = cases
        .map(snoozedCase => {
          if (snoozedCase.receiptNumber === rowData.receiptNumber) {
            return {
              ...snoozedCase,
              snoozeInformation: snoozeData,
              notes: snoozeData.notes
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
        snoozedCases.length < props.summary["SNOOZED_CASES"]
      ) {
        snoozedCases.pop();
      }

      setCases(snoozedCases);
    } catch (e) {
      console.error(e.message);
      setNotification({ message: e.message, type: "error" });
    }
  };

  const deSnooze = async rowData => {
    try {
      const desnoozed = await caseFetcher.deleteActiveSnooze(
        rowData.receiptNumber
      );
      setCases(
        cases.filter(snoozedCase => snoozedCase.receiptNumber !== desnoozed)
      );
      props.updateSummaryData();
      setNotification({
        message: `${desnoozed} has been Unsnoozed.`,
        type: "info"
      });
    } catch (e) {
      setNotification({
        message: "There was an error unsnoozing this case.",
        type: "error"
      });
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
    />
  );
};

SnoozedCaseList.propTypes = {
  setNotification: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired,
  updateSummaryData: PropTypes.func.isRequired
};

export { SnoozedCaseList };
