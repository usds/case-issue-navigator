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
import { Well } from "./util/Well";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading,
  summary: state.cases.summary,
  lastUpdated: state.cases.lastUpdated
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setCaseType: casesActionCreators.setCaseType,
      loadCases: loadCases,
      setError: appStatusActionCreators.setDataLoadError,
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

    return (
      <React.Fragment>
        {this.renderDeSnoozeWarning()}
        <CaseFilterForm snoozeState={this.props.snoozeState} />
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
