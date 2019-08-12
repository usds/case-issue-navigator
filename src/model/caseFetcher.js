import { CASE_MANAGEMENT_SYSTEM, CASE_TYPE } from "../controller/config";

const caseFetcher = ({ baseUrl, resultsPerPage }) => {
  const caseManagementSystem = CASE_MANAGEMENT_SYSTEM;
  const caseType = CASE_TYPE;

  const deleteActiveSnooze = receiptNumber => {
    return fetch(
      `${baseUrl}/api/caseDetails/${caseManagementSystem}/${receiptNumber}/activeSnooze`,
      {
        method: "DELETE"
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return receiptNumber;
    });
  };

  const getCases = (activeOrSnoozed, page) => {
    return fetch(
      `${baseUrl}/api/cases/${caseManagementSystem}/${caseType}/${activeOrSnoozed}?page=${page}&size=${resultsPerPage}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    });
  };

  const getActiveCases = page => getCases("active", page);

  const getSnoozedCases = page => getCases("snoozed", page);

  const getCaseSummary = () => {
    return fetch(
      `${baseUrl}/api/cases/${caseManagementSystem}/${caseType}/summary`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    });
  };

  const updateActiveSnooze = (receiptNumber, snoozeInputs) => {
    return fetch(
      `${baseUrl}/api/caseDetails/${caseManagementSystem}/${receiptNumber}/activeSnooze`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          details: snoozeInputs.details || "",
          duration: snoozeInputs.duration,
          reason: snoozeInputs.reason
        })
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    });
  };

  return {
    deleteActiveSnooze,
    getActiveCases,
    getCaseSummary,
    getSnoozedCases,
    updateActiveSnooze
  };
};

export default caseFetcher;
