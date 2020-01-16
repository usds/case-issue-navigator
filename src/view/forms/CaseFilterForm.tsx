import React from "react";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../../redux/modules/cases";
import { caseFilterActionCreators } from "../../redux/modules/caseFilters";
import { loadCases, loadSearchResults } from "../../redux/modules/casesAsync";
import { connect } from "react-redux";
import { CaseAgeFilter } from "./CaseAgeFilter";
import { CaseStatusFilter } from "./CaseStatusFilter";
import { SnoozeReasonFilter } from "./SnoozeReasonFilter";
import { ServiceNowFilter } from "./ServiceNowFilter";
import { SnoozeStateFilter } from "./SnoozeStateFilter";
import { CaseSearch } from "./CaseSearch";
import { Well } from "../util/Well";
import "./CaseFilterForm.scss";
import UsaButton from "../util/UsaButton";
import { hasFilters } from "../../redux/selectors";

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
  activeSearch: state.caseFilters.activeSearch,
  caseStatus: state.caseFilters.caseStatus,
  hasFilters: hasFilters(state)
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
      setCaseStatus: caseFilterActionCreators.setCaseStatus,
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

  const onCaseStatusUpdate = (caseStatus: CaseStatusOptions) => {
    props.setCaseStatus(caseStatus);
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
        <div className="float-left margin-right-2">
          <CaseSearch
            search={props.search}
            onSearchChange={props.setSearch}
            onSearchSubmit={onSearch}
            onSearchClear={onClear}
          />
        </div>
        {!props.activeSearch && (
          <React.Fragment>
            <div className="float-left margin-right-2">
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
            <div className="float-left margin-right-2">
              <SnoozeReasonFilter
                snoozeState={props.snoozeState}
                snoozeReason={props.snoozeReasonFilter}
                onUpdate={onSnoozeReasonFilterUpdate}
              />
            </div>
            <div className="float-left margin-right-2">
              <CaseStatusFilter
                caseStatus={props.caseStatus}
                onUpdate={onCaseStatusUpdate}
              />
            </div>
            <div className="float-left margin-right-2 margin-top-4">
              <SnoozeStateFilter
                snoozeState={props.snoozeState}
                alarmedCases={props.summary.PREVIOUSLY_SNOOZED}
                onUpdate={onSnoozeStateFilterUpdate}
              />
            </div>
            <div className="float-left margin-right-2">
              <ServiceNowFilter
                snoozeState={props.snoozeState}
                serviceNowFilter={props.serviceNowFilter}
                onUpdate={onServiceNowFilter}
              />
            </div>
          </React.Fragment>
        )}
        {props.hasFilters && (
          <div className="float-right margin-right-2 margin-top-2">
            <UsaButton buttonStyle="secondary" onClick={onClear}>
              Clear Filters
            </UsaButton>
          </div>
        )}
      </div>
    </Well>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseFilterForm);
