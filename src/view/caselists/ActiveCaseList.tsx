import React from "react";
import CaseList from "./CaseList";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import {
  casesActionCreators,
  loadCases,
  getCaseSummary
} from "../../redux/modules/cases";
import { connect } from "react-redux";
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
      setCaseType: casesActionCreators.setCaseType,
      loadCases: loadCases,
      setNotification: appStatusActionCreators.setNotification,
      setError: appStatusActionCreators.setDataLoadError,
      getSummary: getCaseSummary,
      clearCases: casesActionCreators.clearCases
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class UnconnectedActiveCaseList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      setNotification,
      setError,
      summary,
      removeCase,
      toggleDetails,
      getSummary
    } = this.props;
    const i90headers: I90Header[] = [
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
          updateSummaryData: getSummary,
          setError: setError,
          setNotification: setNotification,
          removeCase: removeCase
        }
      }
    ];
    return (
      <React.Fragment>
        <CaseList
          headers={i90headers}
          totalCases={summary.CASES_TO_WORK}
          snoozeState={"active"}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedActiveCaseList);
