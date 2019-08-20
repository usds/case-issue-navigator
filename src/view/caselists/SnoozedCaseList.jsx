import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DeSnoozeForm from "../../controller/DeSnoozeForm";
import { VIEWS, I90_HEADERS } from "../../controller/config";
import { getHeaders } from "../util/getHeaders";
import { CaseList } from "./CaseList";
import caseFetcher from "../../model/caseFetcher";
import { approximateDays } from "../util/approximateDays";

const SnoozedCaseList = props => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { notify } = props;

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
        notify("There was an error loading cases.", "error");
      });
  }, [setCases, currentPage, notify]);

  const reSnooze = async (rowData, snoozeOption) => {
    try {
      const snoozeData = caseFetcher.updateActiveSnooze(rowData.receiptNumber, {
        duration: snoozeOption.duration,
        reason: snoozeOption.value
      });

      const snoozeDays = approximateDays({
        startDate: snoozeData.snoozeStart,
        endDate: snoozeData.snoozeEnd
      });

      notify(
        `${
          rowData.receiptNumber
        } has been Snoozed for ${snoozeDays} day${snoozeDays !== 1 &&
          "s"} due to ${snoozeData.snoozeReason}.`,
        "success"
      );
      const snoozedCases = this.state.snoozed_cases
        .map(snoozedCase => {
          if (snoozedCase.receiptNumber === rowData.receiptNumber) {
            return { ...snoozedCase, snoozeInformation: snoozeData };
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
        snoozedCases.length < props.summary[VIEWS.SNOOZED_CASES.TITLE]
      ) {
        snoozedCases.pop();
      }

      setCases(snoozedCases);
    } catch (e) {
      console.error(e.message);
      notify(e.message, "error");
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
      notify(`${desnoozed} has been Unsnoozed.`, "info");
    } catch (e) {
      notify("There was an error unsnoozing this case.", "error");
    }
  };

  const callbacks = {
    reSnooze,
    deSnooze
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
  notify: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired,
  updateSummaryData: PropTypes.func.isRequired
};

export { SnoozedCaseList };
