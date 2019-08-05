const caseFetcher = ({ baseUrl, resultsPerPage }) => {
  const caseManagementSystem = "DEFAULT";
  const caseType = "STANDARD";

  const getCases = (type, page) => {
    return fetch(
      `${baseUrl}/api/cases/${caseManagementSystem}/${caseType}/${type}?page=${page}&size=${resultsPerPage}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    });
  };

  const getActiveCases = page => getCases("active", page);

  const getSnoozedCases = page => getCases("snoozed", page);

  return { getActiveCases, getSnoozedCases };
};

export default caseFetcher;
