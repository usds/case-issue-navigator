import React from "react";
import { DesnoozedWarning } from "./notifications/DesnoozedWarning";
import { RootState } from "../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../redux/modules/cases";
import { loadCases, reLoadCases } from "../redux/modules/casesAsync";
import { connect } from "react-redux";
import { appStatusActionCreators } from "../redux/modules/appStatus";
import LoadMore from "./layout/LoadMore";
import I90Table from "./tables/i90-table/I90Table";
import { DateRangePicker } from "./util/DateRangePicker";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading,
  summary: state.cases.summary,
  start: state.cases.caseCreationStart,
  end: state.cases.caseCreationEnd,
  lastUpdated: state.cases.lastUpdated
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setCaseType: casesActionCreators.setCaseType,
      loadCases: loadCases,
      reLoadCases: reLoadCases,
      setError: appStatusActionCreators.setDataLoadError,
      clearCases: casesActionCreators.clearCases,
      setStart: casesActionCreators.setCaseCreationStart,
      setEnd: casesActionCreators.setCaseCreationEnd
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

  getCaseCreationStart() {
    if (this.props.start) {
      return this.props.start;
    }
    if (this.props.caselist.length) {
      return new Date(this.props.caselist[0].caseCreation);
    }
    return new Date();
  }

  getCaseCreationEnd() {
    if (this.props.end) {
      return this.props.end;
    }
    if (this.props.lastUpdated) {
      const end = new Date(this.props.lastUpdated);
      // HACK: This hard codes the fact that the case data currntly include cases older than 1 year
      end.setFullYear(end.getFullYear() - 1);
      return end;
    }
    return new Date();
  }

  render() {
    if (this.state.initializing) {
      return <p>Loading...</p>;
    }

    return (
      <React.Fragment>
        <DateRangePicker
          start={this.getCaseCreationStart()}
          end={this.getCaseCreationEnd()}
          lastUpdated={this.props.lastUpdated}
          caselist={this.props.caselist}
          onStartChange={this.props.setStart}
          onEndChange={this.props.setEnd}
          onSubmit={this.props.reLoadCases}
        />
        {this.renderDeSnoozeWarning()}
        <I90Table />
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
