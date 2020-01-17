import React from "react";
import { SnoozeFormWrapper } from "../../../controller/SnoozeFormWrapper";
import UpdateSnoozeFormWrapper from "../../../controller/UpdateSnoozeFormWrapper";
import { casesActionCreators } from "../../../redux/modules/cases";
import { getCaseSummary } from "../../../redux/modules/casesAsync";
import { appStatusActionCreators } from "../../../redux/modules/appStatus";

interface Props {
  selectedCases: Case[];
  caseType: SnoozeState;
  updateSummaryData: typeof getCaseSummary;
  setError: typeof appStatusActionCreators.setDataLoadError;
  setNotification: typeof appStatusActionCreators.setNotification;
  removeCase: typeof casesActionCreators.removeCase;
  onSnoozeUpdate: typeof casesActionCreators.updateSnooze;
}

export const Actions: React.FC<Props> = ({
  selectedCases,
  caseType,
  updateSummaryData,
  setError,
  setNotification,
  removeCase,
  onSnoozeUpdate
}) => (
  <React.Fragment>
    {["ACTIVE", "ALARMED"].includes(caseType) ? (
      <SnoozeFormWrapper
        selectedCases={selectedCases}
        updateSummaryData={updateSummaryData}
        setError={setError}
        setNotification={setNotification}
        removeCase={removeCase}
      />
    ) : (
      <UpdateSnoozeFormWrapper
        rowData={selectedCases[0]}
        updateSummaryData={updateSummaryData}
        setError={setError}
        setNotification={setNotification}
        removeCase={removeCase}
        onSnoozeUpdate={onSnoozeUpdate}
      />
    )}
  </React.Fragment>
);
