import React, { useState, useEffect } from "react";
import { CaseList } from "./CaseList";
import RestAPIClient from "../../api/RestAPIClient";

interface Props {
  updateSummaryData: () => void;
  setError: React.Dispatch<APIError>;
  setNotification: React.Dispatch<React.SetStateAction<AppNotification>>;
  summary: Summary;
}

const SnoozedCaseList = (props: Props) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setNotification, setError, summary } = props;

  useEffect(() => {
    loadMoreCases();
  }, []);

  const onSnoozeUpdate = (
    receiptNumber: string,
    newNotes: DBNote[],
    snoozeInformation: SnoozeInformation
  ) => {
    const snoozedCases = cases
      .map(snoozedCase => {
        if (snoozedCase.receiptNumber === receiptNumber) {
          const notes = snoozedCase.notes
            ? snoozedCase.notes.concat(newNotes)
            : newNotes;
          return {
            ...snoozedCase,
            snoozeInformation: snoozeInformation,
            notes
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

    setCases(snoozedCases);
  };

  const removeCase = (receiptNumber: string) => {
    setCases(
      cases.filter(snoozedCase => snoozedCase.receiptNumber !== receiptNumber)
    );
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

  return (
    <React.Fragment>
      <CaseList
        cases={cases}
        headers={[
          { key: "showDetails", props: { toggleDetails } },
          { key: "receiptNumber" },
          { key: "caseAge" },
          { key: "applicationReason" },
          { key: "platform" },
          { key: "problem" },
          { key: "snoozed" },
          { key: "assigned" },
          { key: "SNTicket" },
          {
            key: "snoozeActions",
            props: {
              updateSummaryData: props.updateSummaryData,
              setError,
              setNotification,
              onSnoozeUpdate,
              removeCase
            }
          }
        ]}
        isLoading={isLoading}
        totalCases={summary.SNOOZED_CASES}
        loadMoreCases={loadMoreCases}
      />
    </React.Fragment>
  );
};

export { SnoozedCaseList };
