import {
  API_BASE_URL,
  DEFAULT_RESULTS_PER_PAGE,
  CASE_MANAGEMENT_SYSTEM,
  CASE_TYPE
} from "../controller/config";

const baseUrl = API_BASE_URL;

const caseFetcher = () => {
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
    const resultsPerPage = DEFAULT_RESULTS_PER_PAGE;
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
        body: JSON.stringify(snoozeInputs)
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

export default caseFetcher();
