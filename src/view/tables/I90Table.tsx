import React from "react";
import { CaseDetails } from "./CaseDetails";
import { ChevronToggle } from "../util/ChevronToggle";
import { connect } from "react-redux";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators, getCaseSummary } from "../../redux/modules/cases";
import { RootState } from "../../redux/create";
import { ELIS_CASE_BASE_URL, SNOOZE_OPTIONS } from "../../controller/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import DateUtils from "../../utils/DateUtils";
import NoteUtils from "../../utils/NoteUtils";
import { SnoozeFormWrapper } from "../../controller/SnoozeFormWrapper";
import { UpdateSnoozeFormWrapper } from "../../controller/UpdateSnoozeFormWrapper";
import { appStatusActionCreators } from "../../redux/modules/appStatus";
import "./ReceiptDisplayRow.scss";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  caseType: state.cases.type,
  isLoading: state.cases.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      toggleDetails: casesActionCreators.toggleDetails,
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
  caseType,
  isLoading,
  toggleDetails,
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
    return <p>No cases found.</p>;
  }

  const numberOfColumns = 10;

  const caseAge = (r: Case) => {
    const caseCreationDays = DateUtils.numberOfDaysSince(r.caseCreation);
    const caseCreationPlural = caseCreationDays === 1 ? "" : "s";
    return `${caseCreationDays} day${caseCreationPlural}`;
  };

  const caseCreation = (r: Case) => {
    const d = r.caseCreation;
    const datum = new Date(d);

    if (d && !isNaN(datum as any)) {
      return (
        datum.getMonth() + 1 + "/" + datum.getDate() + "/" + datum.getFullYear()
      );
    }

    return "Invalid date";
  };

  const platform = (r: Case) => {
    return String(r.extraData.i90SP) === "true" ? "SP" : "Legacy";
  };

  const problem = (r: Case) => {
    const reason = r.snoozeInformation
      ? r.snoozeInformation.snoozeReason
      : undefined;
    if (!reason) {
      console.error("Snooze information not found");
      return;
    }
    return SNOOZE_OPTIONS[reason] ? SNOOZE_OPTIONS[reason].shortText : reason;
  };

  const snoozed = (r: Case) => {
    const snoozeEnd = r.snoozeInformation
      ? r.snoozeInformation.snoozeEnd
      : undefined;
    if (!snoozeEnd) {
      console.error("Snooze information not found");
      return;
    }
    const days = DateUtils.numberOfDaysUntil(snoozeEnd);
    const plural = days === 1 ? "" : "s";
    return `${days} day${plural}`;
  };

  const assigned = (r: Case) => {
    const assignee = NoteUtils.getFollowUp(r.notes, "assignee");
    return assignee ? assignee.content : "";
  };

  const snTicket = (r: Case) => {
    const ticket = NoteUtils.getFollowUp(r.notes, "troubleticket");
    if (ticket == null) {
      return null;
    }
    return (
      <React.Fragment key={ticket.content}>
        <a
          href={ticket.href ? ticket.href : undefined}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ticket.content}
        </a>
        <br />
      </React.Fragment>
    );
  };

  return (
    <table className="usa-table usa-table--borderless width-full">
      <thead>
        <tr>
          <td className="min"></td>
          <td>Receipt Number</td>
          <td>Case Age</td>
          {caseType === "active" && <td>Case Creation</td>}
          <td>Application Reason</td>
          {caseType === "active" && <td>Case Status</td>}
          {caseType === "active" && <td>Case Substatus</td>}
          <td>Platform</td>
          {caseType === "snoozed" && <td>Problem</td>}
          {caseType === "snoozed" && <td>Snoozed</td>}
          <td>Assigned</td>
          {caseType === "snoozed" && <td>SN Ticket #</td>}
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {caselist.map(r => {
          return (
            <React.Fragment key={r.receiptNumber}>
              <tr className={r.showDetails ? "row--show-details" : undefined}>
                <td className="min">
                  <ChevronToggle
                    toggle={() => toggleDetails(r.receiptNumber)}
                    open={r.showDetails}
                  />
                </td>
                <td>
                  <a
                    href={ELIS_CASE_BASE_URL + r.receiptNumber}
                    target="_elis_viewer"
                  >
                    {r.receiptNumber}
                  </a>
                  {r && r.previouslySnoozed && (
                    <React.Fragment>
                      &nbsp;
                      <FontAwesomeIcon
                        icon="exclamation-triangle"
                        className="text-accent-warm"
                        aria-label="Snooze expired - Please review case"
                        data-tip
                        data-place="right"
                      />
                      <ReactTooltip>
                        Snooze expired - Please review case
                      </ReactTooltip>
                    </React.Fragment>
                  )}
                </td>
                <td>{caseAge(r)}</td>
                {caseType === "active" && <td>{caseCreation(r)}</td>}
                <td>{r.extraData.applicationReason}</td>
                {caseType === "active" && <td>{r.extraData.caseStatus}</td>}
                {caseType === "active" && <td>{r.extraData.caseSubstatus}</td>}
                <td>{platform(r)}</td>
                {caseType === "snoozed" && <td>{problem(r)}</td>}
                {caseType === "snoozed" && <td>{snoozed(r)}</td>}
                <td>{assigned(r)}</td>
                {caseType === "snoozed" && <td>{snTicket(r)}</td>}
                <td>
                  {caseType === "active" ? (
                    <SnoozeFormWrapper
                      rowData={r}
                      updateSummaryData={updateSummaryData}
                      setError={setError}
                      setNotification={setNotification}
                      removeCase={removeCase}
                    />
                  ) : (
                    <UpdateSnoozeFormWrapper
                      rowData={r}
                      updateSummaryData={updateSummaryData}
                      setError={setError}
                      setNotification={setNotification}
                      removeCase={removeCase}
                      onSnoozeUpdate={onSnoozeUpdate}
                    />
                  )}
                </td>
              </tr>
              {r.showDetails && (
                <CaseDetails numberOfColumns={numberOfColumns} rowData={r} />
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedI90Table);
