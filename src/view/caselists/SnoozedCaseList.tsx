import React, { useEffect } from "react";
import { CaseList } from "./CaseList";
import { connect } from "react-redux";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import {
  casesActionCreators,
  loadCases,
  getCaseSummary
} from "../../redux/modules/cases";
import { appStatusActionCreators } from "../../redux/modules/appStatus";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading,
  summary: state.cases.summary
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      removeCase: casesActionCreators.removeCase,
      toggleDetails: casesActionCreators.toggleDetails,
      loadCases: loadCases,
      setCases: casesActionCreators.setCases,
      setCaseType: casesActionCreators.setCaseType,
      setNotification: appStatusActionCreators.setNotification,
      setError: appStatusActionCreators.setDataLoadError,
      getSummary: getCaseSummary,
      clearCases: casesActionCreators.clearCases
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedSnoozedCaseList = (props: Props) => {
  const {
    setNotification,
    setError,
    summary,
    caselist,
    loadCases,
    isLoading,
    removeCase,
    toggleDetails,
    setCases,
    setCaseType,
    getSummary,
    clearCases
  } = props;

  useEffect(() => {
    clearCases();
    setCaseType("snoozed");
    loadCases("snoozed");
  }, [setCaseType, loadCases, clearCases]);

  const loadMoreCases = () => {
    const receiptNumber =
      caselist.length > 0
        ? caselist[caselist.length - 1].receiptNumber
        : undefined;
    loadCases("snoozed", receiptNumber);
  };

  const onSnoozeUpdate = (
    receiptNumber: string,
    newNotes: DBNote[],
    snoozeInformation: SnoozeInformation
  ) => {
    const snoozedCases = caselist
      .map(snoozedCase => {
        if (snoozedCase.receiptNumber === receiptNumber) {
          const notes = snoozedCase.notes
            ? snoozedCase.notes.concat(newNotes)
            : newNotes;
          return {
            ...snoozedCase,
            snoozeInformation: snoozeInformation,
            notes
          };
        }
        return snoozedCase;
      })
      .sort((a, b) => {
        return (
          new Date(
            (a.snoozeInformation as SnoozeInformation).snoozeEnd
          ).getTime() -
          new Date().getTime() -
          (new Date(
            (b.snoozeInformation as SnoozeInformation).snoozeEnd
          ).getTime() -
            new Date().getTime())
        );
      });

    if (
      snoozedCases[snoozedCases.length - 1].receiptNumber === receiptNumber &&
      snoozedCases.length < summary["SNOOZED_CASES"]
    ) {
      snoozedCases.pop();
    }

    setCases(snoozedCases);
  };

  return (
    <React.Fragment>
      <CaseList
        cases={caselist}
        headers={[
          { key: "showDetails", props: { toggleDetails } },
          { key: "receiptNumber" },
          { key: "caseAge" },
          { key: "applicationReason" },
          { key: "platform" },
          { key: "problem" },
          { key: "snoozed" },
          { key: "assigned" },
          { key: "SNTicket" },
          {
            key: "snoozeActions",
            props: {
              updateSummaryData: getSummary,
              setError,
              setNotification,
              onSnoozeUpdate,
              removeCase
            }
          }
        ]}
        isLoading={isLoading}
        totalCases={summary.SNOOZED_CASES}
        loadMoreCases={loadMoreCases}
      />
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedSnoozedCaseList);
