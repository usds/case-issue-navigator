import { CASE_MANAGEMENT_SYSTEM, CASE_TYPE } from "../controller/config";

const caseFetcher = ({ baseUrl, resultsPerPage }) => {
  const caseManagementSystem = CASE_MANAGEMENT_SYSTEM;
  const caseType = CASE_TYPE;

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

  return { getActiveCases, getCaseSummary, getSnoozedCases };
};

export default caseFetcher;
