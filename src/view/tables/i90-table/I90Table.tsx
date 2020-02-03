import React from "react";
import { CaseDetails } from "../CaseDetails";
import { connect } from "react-redux";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../../../redux/modules/cases";
import { getCaseSummary } from "../../../redux/modules/casesAsync";
import { RootState } from "../../../redux/create";
import { appStatusActionCreators } from "../../../redux/modules/appStatus";
import { Problem } from "./Problem";
import { CaseState } from "./CaseState";
import { ServiceNowTicket } from "./ServiceNowTicket";
import { Actions } from "./Actions";
import { Card } from "../../util/Card";
import "./ReceiptDisplayRow.scss";
import "./TableCell.scss";
import { hasFilters } from "../../../redux/selectors";
import { ELIS_CASE_BASE_URL } from "../../../controller/config";
import DateUtils from "../../../utils/DateUtils";
import { ResolveForm } from "../../../controller/ResolveForm";
import RestAPIClient from "../../../api/RestAPIClient";
import { trackEvent } from "../../../matomo-setup";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading,
  hasFilters: hasFilters(state),
  snoozeState: state.caseFilters.snoozeState
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      updateSummaryData: getCaseSummary,
      setError: appStatusActionCreators.setDataLoadError,
      setNotification: appStatusActionCreators.setNotification,
      removeCase: casesActionCreators.removeCase,
      onSnoozeUpdate: casesActionCreators.updateSnooze
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const UnconnectedI90Table: React.FC<Props> = ({
  caselist,
  isLoading,
  hasFilters,
  updateSummaryData,
  setError,
  setNotification,
  removeCase,
  onSnoozeUpdate
}) => {
  if (caselist.length === 0 && isLoading) {
    return null;
  }

  if (caselist.length === 0 && !isLoading) {
    return <p>No cases found.{hasFilters && " Check your filters."}</p>;
  }

  const deSnooze = async (receiptNumber: string) => {
    const response = await RestAPIClient.caseDetails.deleteActiveSnooze(
      receiptNumber
    );

    if (response.succeeded) {
      updateSummaryData();
      removeCase(receiptNumber);
      trackEvent("snooze", "deSnooze", "desnoozed");
      setNotification({
        message: `${receiptNumber} has been resolved.`,
        type: "info"
      });
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
      {caselist.map(caseData => {
        return (
          <div style={{ margin: "10px 0" }}>
            <Card>
              <div className="case-header">
                <a
                  className="usa-button  usa-button--unstyled receiptNumber"
                  href={ELIS_CASE_BASE_URL + caseData.receiptNumber}
                  target="_elis_viewer"
                >
                  {caseData.receiptNumber}
                </a>
                <Actions
                  caseData={caseData}
                  updateSummaryData={updateSummaryData}
                  setError={setError}
                  setNotification={setNotification}
                  removeCase={removeCase}
                  onSnoozeUpdate={onSnoozeUpdate}
                />
              </div>
              <div className="case-data">
                <div className="case-state">
                  <CaseState caseData={caseData} />
                </div>
                <div className="case-problem">
                  <Problem caseData={caseData} />
                </div>
                <div className="case-creation">
                  {DateUtils.badgeFormat(caseData.caseCreation)}
                </div>
                <div className="case-reason text-gray-50">
                  ({caseData.extraData.applicationReason})
                </div>
              </div>
              <div className="case-metadata text-gray-70">
                <div className="status">
                  {caseData.extraData.caseStatus} -{" "}
                  {caseData.extraData.caseSubstatus}
                </div>
                <div className="platform">
                  {String(caseData.extraData.i90SP) === "true"
                    ? "SP"
                    : "Legacy"}{" "}
                  Platform
                </div>
              </div>
              <div className="case-footer">
                <div className="case-links">
                  <ServiceNowTicket caseData={caseData} />
                  <CaseDetails rowData={caseData} />
                </div>
                <ResolveForm rowData={caseData} deSnooze={deSnooze} />
              </div>
            </Card>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedI90Table);
