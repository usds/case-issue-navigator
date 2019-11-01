import React, { useEffect } from "react";
import { CaseList } from "./CaseList";
import { DesnoozedWarning } from "../notifications/DesnoozedWarning";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators, loadCases } from "../../redux/modules/cases";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      addCases: casesActionCreators.addCases,
      setCases: casesActionCreators.setCases,
      removeCase: casesActionCreators.removeCase,
      clearCases: casesActionCreators.clearCases,
      toggleDetails: casesActionCreators.toggleDetails,
      setCaseType: casesActionCreators.setCaseType,
      setIsLoading: casesActionCreators.setIsLoading,
      loadCases: loadCases
    },
    dispatch
  );

type Props = {
  updateSummaryData: () => void;
  setError: React.Dispatch<APIError>;
  setNotification: React.Dispatch<React.SetStateAction<AppNotification>>;
  summary: Summary;
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedActiveCaseList = (props: Props) => {
  const {
    setNotification,
    setError,
    summary,
    removeCase,
    caselist,
    clearCases,
    toggleDetails,
    setCaseType,
    isLoading,
    loadCases
  } = props;

  useEffect(() => {
    clearCases();
    setCaseType("active");
    loadCases();
  }, []);

  const loadMoreCases = () => {
    const receiptNumber =
      caselist.length > 0
        ? caselist[caselist.length - 1].receiptNumber
        : undefined;
    loadCases(receiptNumber);
  };

  return (
    <React.Fragment>
      <DesnoozedWarning
        previouslySnoozedCases={summary.PREVIOUSLY_SNOOZED || 0}
      />
      <CaseList
        cases={caselist}
        headers={[
          { key: "showDetails", props: { toggleDetails } },
          { key: "receiptNumber" },
          { key: "caseAge" },
          { key: "caseCreation" },
          { key: "applicationReason" },
          { key: "caseStatus" },
          { key: "caseSubstatus" },
          { key: "platform" },
          { key: "assigned" },
          {
            key: "actions",
            props: {
              updateSummaryData: props.updateSummaryData,
              setError: setError,
              setNotification: setNotification,
              removeCase: removeCase
            }
          }
        ]}
        isLoading={isLoading}
        totalCases={summary.CASES_TO_WORK}
        loadMoreCases={loadMoreCases}
      />
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedActiveCaseList);
