import React from "react";
import ReceiptList from "./tables/ReceiptList";
import { DesnoozedWarning } from "./notifications/DesnoozedWarning";
import { RootState } from "../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import {
  casesActionCreators,
  loadCases,
  getCaseSummary
} from "../redux/modules/cases";
import { connect } from "react-redux";
import { appStatusActionCreators } from "../redux/modules/appStatus";
import LoadMore from "./layout/LoadMore";

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
      setCaseType: casesActionCreators.setCaseType,
      loadCases: loadCases,
      setNotification: appStatusActionCreators.setNotification,
      setError: appStatusActionCreators.setDataLoadError,
      getSummary: getCaseSummary,
      clearCases: casesActionCreators.clearCases
    },
    dispatch
  );

interface PassedProps {
  snoozeState: SnoozeState;
}

type Props = PassedProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface State {
  initializing: boolean;
}

class CaseList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.props.clearCases();
    this.props.setCaseType(props.snoozeState);
    this.props.loadCases();
    this.state = {
      initializing: true
    };
  }

  componentDidUpdate() {
    if (
      this.state.initializing &&
      this.props.isLoading !== this.state.initializing
    ) {
      this.setState({ initializing: this.props.isLoading });
    }
  }

  getI90Headers(): I90Header[] {
    const {
      setNotification,
      setError,
      removeCase,
      toggleDetails,
      getSummary,
      snoozeState
    } = this.props;
    if (snoozeState === "active") {
      return [
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
    }
    return [
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
    ];
  }

  getTotalCases() {
    const { summary, snoozeState } = this.props;
    if (snoozeState === "active") {
      return summary.CASES_TO_WORK;
    }
    return summary.SNOOZED_CASES;
  }

  renderDeSnoozeWarning() {
    const { summary, snoozeState } = this.props;
    if (snoozeState !== "active") {
      return null;
    }
    return (
      <DesnoozedWarning
        previouslySnoozedCases={summary.PREVIOUSLY_SNOOZED || 0}
      />
    );
  }

  render() {
    if (this.state.initializing) {
      return <p>Loading...</p>;
    }
    const { caselist, isLoading } = this.props;

    return (
      <React.Fragment>
        {this.renderDeSnoozeWarning()}
        <ReceiptList
          cases={caselist}
          isLoading={isLoading}
          headers={this.getI90Headers()}
        />
        <LoadMore
          totalCases={this.getTotalCases()}
          loadedCases={this.props.caselist.length}
          isLoading={this.props.isLoading}
          onClick={this.props.loadCases}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseList);
