import React from "react";
import { CaseDetails } from "../CaseDetails";
import { connect } from "react-redux";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../../../redux/modules/cases";
import { getCaseSummary } from "../../../redux/modules/casesAsync";
import { RootState } from "../../../redux/create";
import { appStatusActionCreators } from "../../../redux/modules/appStatus";
import { DetailToggle } from "./DetailToggle";
import { ReceiptNumberLink } from "./ReceiptNumberLink";
import { CaseAge } from "./CaseAge";
import { CaseCreation } from "./CaseCreation";
import { ApplicationReason } from "./ApplicationReason";
import { CaseStatus } from "./CaseStatus";
import { CaseSubstatus } from "./CaseSubstatus";
import { Platform } from "./Platform";
import { Problem } from "./Problem";
import { SnoozeDaysLeft } from "./SnoozeDaysLeft";
import { ServiceNowTicket } from "./ServiceNowTicket";
import { Actions } from "./Actions";
import "./ReceiptDisplayRow.scss";
import "./TableCell.scss";
import { hasFilters } from "../../../redux/selectors";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading,
  hasFilters: hasFilters(state),
  snoozeState: state.caseFilters.snoozeState
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
  snoozeState,
  isLoading,
  hasFilters,
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
    return <p>No cases found.{hasFilters && " Check your filters."}</p>;
  }

  const elements: Array<{
    header: string;
    Cell: React.FC<{ caseData: Case }>;
    className?: string;
    displayIf?: boolean;
    align?: "left" | "right"
  }> = [
    {
      header: "",
      Cell: ({ caseData }) => (
        <DetailToggle caseData={caseData} toggleDetails={toggleDetails} />
      ),
      className: "min",
    },
    {
      header: "Receipt Number",
      Cell: ReceiptNumberLink,
      className: "nowrap"
    },
    {
      header: "Case Age (days)",
      Cell: CaseAge,
      align: "right"
    },
    {
      header: "Case Creation",
      Cell: CaseCreation,
      displayIf: ["ACTIVE", "ALARMED"].includes(snoozeState)
    },
    {
      header: "Application Reason",
      Cell: ApplicationReason
    },
    {
      header: "Case Status",
      Cell: CaseStatus,
      displayIf: ["ACTIVE", "ALARMED"].includes(snoozeState)
    },
    {
      header: "Case Substatus",
      Cell: CaseSubstatus,
      displayIf: ["ACTIVE", "ALARMED"].includes(snoozeState)
    },
    {
      header: "Platform",
      Cell: Platform
    },
    {
      header: "Problem",
      Cell: Problem,
      displayIf: snoozeState === "SNOOZED"
    },
    {
      header: "Due in (days)",
      Cell: SnoozeDaysLeft,
      displayIf: snoozeState === "SNOOZED",
      align: "right"
    },
    {
      header: "SN Ticket #",
      Cell: ServiceNowTicket,
      displayIf: snoozeState === "SNOOZED"
    },
    {
      header: "Actions",
      Cell: ({ caseData }) => (
        <Actions
          caseData={caseData}
          caseType={snoozeState}
          updateSummaryData={updateSummaryData}
          setError={setError}
          setNotification={setNotification}
          removeCase={removeCase}
          onSnoozeUpdate={onSnoozeUpdate}
        />
      )
    }
  ];

  const viewElements = elements.filter(
    ({ displayIf }) => displayIf === undefined || displayIf
  );

  return (
    <table className="usa-table usa-table--borderless width-full">
      <thead>
        <tr>
          {viewElements.map(({ header, className, align }) => (
            <td key={header} className={className} align={align}>
              {header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {caselist.map(caseData => {
          return (
            <React.Fragment key={caseData.receiptNumber}>
              <tr
                className={
                  caseData.showDetails ? "row--show-details" : undefined
                }
              >
                {viewElements.map(({ header, Cell, className, align }) => (
                  <td
                    key={`${header}-${caseData.receiptNumber}`}
                    className={className}
                    align={align}
                  >
                    <Cell caseData={caseData} />
                  </td>
                ))}
              </tr>
              {caseData.showDetails && (
                <CaseDetails
                  numberOfColumns={viewElements.length}
                  rowData={caseData}
                />
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
