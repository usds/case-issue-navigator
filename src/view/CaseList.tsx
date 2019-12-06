import React from "react";
import { DesnoozedWarning } from "./notifications/DesnoozedWarning";
import { RootState } from "../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../redux/modules/cases";
import { loadCases } from "../redux/modules/casesAsync";
import { connect } from "react-redux";
import { appStatusActionCreators } from "../redux/modules/appStatus";
import LoadMore from "./layout/LoadMore";
import I90Table from "./tables/i90-table/I90Table";
import CaseFilterForm from "./forms/CaseFilterForm";
import {
  SNOOZE_OPTIONS,
  CASE_CREATION_START,
  CASE_CREATION_END,
  SNOOOZE_REASON,
  SN_TICKET
} from "../controller/config";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading,
  summary: state.cases.summary,
  lastUpdated: state.cases.lastUpdated,
  hasMoreCases: state.cases.hasMoreCases
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setCaseType: casesActionCreators.setCaseType,
      loadCases: loadCases,
      setError: appStatusActionCreators.setDataLoadError,
      clearCases: casesActionCreators.clearCases,
      setStart: casesActionCreators.setCaseCreationStart,
      setEnd: casesActionCreators.setCaseCreationEnd,
      setSnoozeReasonFilter: casesActionCreators.setSnoozeReasonFilter,
      setServiceNowFilter: casesActionCreators.setServiceNowFilter
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

    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get(CASE_CREATION_START);
    const end = urlParams.get(CASE_CREATION_END);
    if (start) {
      const startDate = new Date(decodeURI(start));
      if (!isNaN(startDate.getTime())) {
        this.props.setStart(startDate);
      }
    }
    if (end) {
      const endDate = new Date(decodeURI(end));
      if (!isNaN(endDate.getTime())) {
        this.props.setEnd(endDate);
      }
    }
    if (props.snoozeState) {
      const reason = urlParams.get(SNOOOZE_REASON);
      if (reason && Object.keys(SNOOZE_OPTIONS).includes(reason)) {
        this.props.setSnoozeReasonFilter(reason as SnoozeReason);
      }
      const sn = urlParams.get(SN_TICKET);
      if (sn === "true") {
        this.props.setServiceNowFilter(true);
      } else if (sn === "false") {
        this.props.setServiceNowFilter(false);
      }
    }

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

  getTotalCases() {
    const { summary, snoozeState } = this.props;
    if (snoozeState === "ACTIVE") {
      return summary.CASES_TO_WORK;
    }
    return summary.SNOOZED_CASES;
  }

  renderDeSnoozeWarning() {
    const { summary, snoozeState } = this.props;
    if (snoozeState !== "ACTIVE") {
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

    return (
      <React.Fragment>
        {this.renderDeSnoozeWarning()}
        <CaseFilterForm/>
        <I90Table />
        <LoadMore
          hasMoreCases={this.props.hasMoreCases}
          isLoading={this.props.isLoading}
          onClick={() => this.props.loadCases()}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseList);
