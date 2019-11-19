import React from "react";
import { SnoozeFormWrapper } from "../../../controller/SnoozeFormWrapper";
import { UpdateSnoozeFormWrapper } from "../../../controller/UpdateSnoozeFormWrapper";
import {
  casesActionCreators,
  getCaseSummary
} from "../../../redux/modules/cases";
import { appStatusActionCreators } from "../../../redux/modules/appStatus";

interface Props {
  caseData: Case;
  caseType: SnoozeState;
  updateSummaryData: typeof getCaseSummary;
  setError: typeof appStatusActionCreators.setDataLoadError;
  setNotification: typeof appStatusActionCreators.setNotification;
  removeCase: typeof casesActionCreators.removeCase;
  onSnoozeUpdate: typeof casesActionCreators.updateSnooze;
}

export const Actions: React.FC<Props> = ({
  caseData,
  caseType,
  updateSummaryData,
  setError,
  setNotification,
  removeCase,
  onSnoozeUpdate
}) => (
  <React.Fragment>
    {caseType === "active" ? (
      <SnoozeFormWrapper
        rowData={caseData}
        updateSummaryData={updateSummaryData}
        setError={setError}
        setNotification={setNotification}
        removeCase={removeCase}
      />
    ) : (
      <UpdateSnoozeFormWrapper
        rowData={caseData}
        updateSummaryData={updateSummaryData}
        setError={setError}
        setNotification={setNotification}
        removeCase={removeCase}
        onSnoozeUpdate={onSnoozeUpdate}
      />
    )}
  </React.Fragment>
);
