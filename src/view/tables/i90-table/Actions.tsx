import React from "react";
import { TriageFormWrapper } from "../../../controller/TriageFormWrapper";
import UpdateTriageFormWrapper from "../../../controller/UpdateTriageFormWrapper";
import { casesActionCreators } from "../../../redux/modules/cases";
import { getCaseSummary } from "../../../redux/modules/casesAsync";
import { appStatusActionCreators } from "../../../redux/modules/appStatus";
import CaseUtils from "../../../utils/CaseUtils";

interface Props {
  caseData: Case;
  setError: typeof appStatusActionCreators.setDataLoadError;
  updateSummaryData: typeof getCaseSummary;
  setNotification: typeof appStatusActionCreators.setNotification;
  removeCase: typeof casesActionCreators.removeCase;
  onSnoozeUpdate: typeof casesActionCreators.updateSnooze;
}

export const Actions: React.FC<Props> = ({
  caseData,
  setError,
  updateSummaryData,
  setNotification,
  removeCase,
  onSnoozeUpdate
}) => {
  if (!CaseUtils.getProblem(caseData) || CaseUtils.isResolved(caseData)) {
    return (
      <TriageFormWrapper
        rowData={caseData}
        updateSummaryData={updateSummaryData}
        setError={setError}
        setNotification={setNotification}
        removeCase={removeCase}
      />
    );
  }
  return (
    <UpdateTriageFormWrapper
      rowData={caseData}
      updateSummaryData={updateSummaryData}
      setError={setError}
      setNotification={setNotification}
      removeCase={removeCase}
      onSnoozeUpdate={onSnoozeUpdate}
    />
  );
};
