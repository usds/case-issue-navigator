import React, { useState, useEffect } from "react";
import { CaseList } from "./CaseList";
import RestAPIClient from "../../api/RestAPIClient";
import { DesnoozedWarning } from "../notifications/DesnoozedWarning";

interface Props {
  updateSummaryData: () => void;
  setError: React.Dispatch<APIError>;
  setNotification: React.Dispatch<React.SetStateAction<AppNotification>>;
  summary: Summary;
}

const ActiveCaseList = (props: Props) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setNotification, setError, summary } = props;

  useEffect(() => {
    loadMoreCases();
  }, []);

  const removeCase = (receiptNumber: string) => {
    setCases(cases.filter(c => c.receiptNumber !== receiptNumber));
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

  return (
    <React.Fragment>
      <DesnoozedWarning
        previouslySnoozedCases={summary.PREVIOUSLY_SNOOZED || 0}
      />
      <CaseList
        cases={cases}
        headers={[
          { key: "showDetails", props: { toggleDetails } },
          { key: "receiptNumber" },
          { key: "caseAge" },
          { key: "caseCreation" },
          { key: "applicationReason" },
          { key: "caseStatus" },
          { key: "caseSubstatus" },
          { key: "platform" },
          { key: "assigned" },
          {
            key: "actions",
            props: {
              updateSummaryData: props.updateSummaryData,
              setError: setError,
              setNotification: setNotification,
              removeCase: removeCase
            }
          }
        ]}
        isLoading={isLoading}
        totalCases={summary.CASES_TO_WORK}
        loadMoreCases={loadMoreCases}
      />
    </React.Fragment>
  );
};

export { ActiveCaseList };
