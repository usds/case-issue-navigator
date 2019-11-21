import React from "react";
import { CaseDetails } from "../CaseDetails";
import { connect } from "react-redux";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import {
  casesActionCreators,
  getCaseSummary
} from "../../../redux/modules/cases";
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
import { Assigned } from "./Assigned";
import { ServiceNowTicket } from "./ServiceNowTicket";
import { Actions } from "./Actions";
import "./ReceiptDisplayRow.scss";
import "./TableCell.scss";

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

  const elements: Array<{
    header: string;
    Cell: React.FC<{ caseData: Case }>;
    className?: string;
    displayIf?: boolean;
  }> = [
    {
      header: "",
      Cell: ({ caseData }) => (
        <DetailToggle caseData={caseData} toggleDetails={toggleDetails} />
      ),
      className: "min"
    },
    {
      header: "Receipt Number",
      Cell: ReceiptNumberLink,
      className: "nowrap"
    },
    {
      header: "Case Age",
      Cell: CaseAge
    },
    {
      header: "Case Creation",
      Cell: CaseCreation,
      displayIf: caseType === "active"
    },
    {
      header: "Application Reason",
      Cell: ApplicationReason
    },
    {
      header: "Case Status",
      Cell: CaseStatus,
      displayIf: caseType === "active"
    },
    {
      header: "Case Substatus",
      Cell: CaseSubstatus,
      displayIf: caseType === "active"
    },
    {
      header: "Platform",
      Cell: Platform
    },
    {
      header: "Problem",
      Cell: Problem,
      displayIf: caseType === "snoozed"
    },
    {
      header: "Snoozed",
      Cell: SnoozeDaysLeft,
      displayIf: caseType === "snoozed"
    },
    {
      header: "Assigned",
      Cell: Assigned
    },
    {
      header: "SN Ticket #",
      Cell: ServiceNowTicket,
      displayIf: caseType === "snoozed"
    },
    {
      header: "Actions",
      Cell: ({ caseData }) => (
        <Actions
          caseData={caseData}
          caseType={caseType}
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
          {viewElements.map(({ header, className }) => (
            <td key={header} className={className}>
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
                {viewElements.map(({ header, Cell, className }) => (
                  <td
                    key={`${header}-${caseData.receiptNumber}`}
                    className={className}
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
