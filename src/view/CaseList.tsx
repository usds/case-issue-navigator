import React from "react";
import { OverdueCasesWarning } from "./notifications/OverdueCasesWarning";
import { RootState } from "../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../redux/modules/cases";
import { caseFilterActionCreators } from "../redux/modules/caseFilters";
import { loadCases, loadSearchResults } from "../redux/modules/casesAsync";
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
  SNOOZE_STATE,
  SN_TICKET,
  SEARCH
} from "../controller/config";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading,
  summary: state.cases.summary,
  lastUpdated: state.cases.lastUpdated,
  hasMoreCases: state.cases.hasMoreCases,
  snoozeState: state.caseFilters.snoozeState
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setCaseType: caseFilterActionCreators.setSnoozeState,
      loadCases: loadCases,
      loadSearchResults: loadSearchResults,
      setError: appStatusActionCreators.setDataLoadError,
      clearCases: casesActionCreators.clearCases,
      setStart: caseFilterActionCreators.setCaseCreationStart,
      setEnd: caseFilterActionCreators.setCaseCreationEnd,
      setSnoozeReasonFilter: caseFilterActionCreators.setSnoozeReasonFilter,
      setServiceNowFilter: caseFilterActionCreators.setServiceNowFilter,
      clearFilters: caseFilterActionCreators.clearFilters,
      setActiveSearch: caseFilterActionCreators.setActiveSearch,
      setSearch: caseFilterActionCreators.setSearch
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface State {
  initializing: boolean;
}

class CaseList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get(SEARCH);
    if (search) {
      this.props.setSearch(search);
      this.props.setActiveSearch(true);
      this.props.loadSearchResults();
    } else {
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

      const reason = urlParams.get(SNOOOZE_REASON);
      if (reason && Object.keys(SNOOZE_OPTIONS).includes(reason)) {
        this.props.setSnoozeReasonFilter(reason as SnoozeReason);
      }

      if (props.snoozeState === "SNOOZED") {
        const sn = urlParams.get(SN_TICKET);
        if (sn === "true") {
          this.props.setServiceNowFilter(true);
        } else if (sn === "false") {
          this.props.setServiceNowFilter(false);
        }
      }

      const snoozeState = urlParams.get(SNOOZE_STATE);
      if (
        snoozeState &&
        ["SNOOZED", "ACTIVE", "ALARMED"].includes(snoozeState)
      ) {
        this.props.setCaseType(snoozeState as SnoozeState);
      }
      this.props.loadCases();
    }

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

  showAllOverdueCases() {
    this.props.clearCases();
    this.props.clearFilters();
    this.props.setCaseType("ALARMED");
    this.props.loadCases();
  }

  render() {
    if (this.state.initializing) {
      return <p>Loading...</p>;
    }

    return (
      <React.Fragment>
        <OverdueCasesWarning
          snoozeState={this.props.snoozeState}
          overdueCases={this.props.summary.PREVIOUSLY_SNOOZED}
          onShowCases={this.showAllOverdueCases.bind(this)}
        />
        <CaseFilterForm />
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
