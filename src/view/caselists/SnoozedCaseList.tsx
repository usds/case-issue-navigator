import React from "react";
import CaseList from "./CaseList";
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
      updateSnooze: casesActionCreators.updateSnooze,
      removeCase: casesActionCreators.removeCase,
      toggleDetails: casesActionCreators.toggleDetails,
      loadCases: loadCases,
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

class UnconnectedSnoozedCaseList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      toggleDetails,
      getSummary,
      setError,
      setNotification,
      removeCase,
      summary
    } = this.props;
    return (
      <CaseList
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
              onSnoozeUpdate: this.props.updateSnooze,
              setError,
              setNotification,
              removeCase
            }
          }
        ]}
        totalCases={summary.SNOOZED_CASES}
        snoozeState={"snoozed"}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedSnoozedCaseList);
