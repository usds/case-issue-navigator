import React from "react";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../../redux/modules/cases";
import { caseFilterActionCreators } from "../../redux/modules/caseFilters";
import { loadCases, loadSearchResults } from "../../redux/modules/casesAsync";
import { connect } from "react-redux";
import { CaseAgeFilter } from "./CaseAgeFilter";
import { SnoozeReasonFilter } from "./SnoozeReasonFilter";
import { ServiceNowFilter } from "./ServiceNowFilter";
import { SnoozeStateFilter } from "./SnoozeStateFilter";
import { CaseSearch } from "./CaseSearch";
import { Well } from "../util/Well";
import "./CaseFilterForm.scss";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  start: state.caseFilters.caseCreationStart,
  end: state.caseFilters.caseCreationEnd,
  lastUpdated: state.cases.lastUpdated,
  snoozeReasonFilter: state.caseFilters.snoozeReasonFilter,
  serviceNowFilter: state.caseFilters.serviceNowFilter,
  snoozeState: state.caseFilters.snoozeState,
  summary: state.cases.summary,
  search: state.caseFilters.search,
  activeSearch: state.caseFilters.activeSearch
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      loadCases: loadCases,
      loadSearchResults: loadSearchResults,
      clearCases: casesActionCreators.clearCases,
      setStart: caseFilterActionCreators.setCaseCreationStart,
      setEnd: caseFilterActionCreators.setCaseCreationEnd,
      setSnoozeReasonFilter: caseFilterActionCreators.setSnoozeReasonFilter,
      setServiceNowFilter: caseFilterActionCreators.setServiceNowFilter,
      setSnoozeState: caseFilterActionCreators.setSnoozeState,
      setSearch: caseFilterActionCreators.setSearch,
      setActiveSearch: caseFilterActionCreators.setActiveSearch,
      clearFilters: caseFilterActionCreators.clearFilters
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const CaseFilterForm: React.FunctionComponent<Props> = props => {
  const onFilterSubmit = () => {
    props.clearCases();
    props.loadCases();
  };

  const onSnoozeReasonFilterUpdate = (
    problem: SnoozeReason | "all" | "unknown"
  ) => {
    switch (problem) {
      case "all":
        props.setSnoozeState("SNOOZED");
        props.setSnoozeReasonFilter();
        break;
      case "unknown":
        props.setSnoozeState("ACTIVE");
        props.setSnoozeReasonFilter();
        props.setServiceNowFilter();
        break;
      default:
        props.setSnoozeState("SNOOZED");
        props.setSnoozeReasonFilter(problem);
    }
    onFilterSubmit();
  };

  const onServiceNowFilter = (serviceNowFilter?: boolean) => {
    props.setServiceNowFilter(serviceNowFilter);
    onFilterSubmit();
  };

  const onSnoozeStateFilterUpdate = (snoozeState: SnoozeState) => {
    props.setSnoozeState(snoozeState);
    onFilterSubmit();
  };

  const onSearch = () => {
    if (props.search) {
      props.clearCases();
      props.setActiveSearch(true);
      props.loadSearchResults();
    } else {
      onClear();
    }
  };

  const onClear = () => {
    props.setActiveSearch(false);
    props.setSearch();
    props.clearFilters();
    onFilterSubmit();
  };

  return (
    <Well>
      <div className="filter-form">
        <div className="filter-input">
          <CaseSearch
            search={props.search}
            onSearchChange={props.setSearch}
            onSearchSubmit={onSearch}
            onSearchClear={onClear}
          />
        </div>
        {!props.activeSearch ? (
          <React.Fragment>
            <div className="filter-input">
              <CaseAgeFilter
                start={props.start}
                end={props.end}
                lastUpdated={props.lastUpdated}
                caselist={props.caselist}
                onStartChange={props.setStart}
                onEndChange={props.setEnd}
                onSubmit={onFilterSubmit}
              />
            </div>
            <div className="filter-input">
              <SnoozeReasonFilter
                snoozeState={props.snoozeState}
                snoozeReason={props.snoozeReasonFilter}
                onUpdate={onSnoozeReasonFilterUpdate}
              />
            </div>
            <div className="filter-input">
              <SnoozeStateFilter
                snoozeState={props.snoozeState}
                alarmedCases={props.summary.PREVIOUSLY_SNOOZED}
                onUpdate={onSnoozeStateFilterUpdate}
              />
            </div>
            <div className="filter-input">
              <ServiceNowFilter
                snoozeState={props.snoozeState}
                serviceNowFilter={props.serviceNowFilter}
                onUpdate={onServiceNowFilter}
              />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </Well>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseFilterForm);
