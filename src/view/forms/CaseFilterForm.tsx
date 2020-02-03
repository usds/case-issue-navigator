import React, { useState } from "react";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../../redux/modules/cases";
import { caseFilterActionCreators } from "../../redux/modules/caseFilters";
import { loadCases, loadSearchResults } from "../../redux/modules/casesAsync";
import { connect } from "react-redux";
import { CaseSearch } from "./CaseSearch";
import { Card } from "../util/Card";
import "./CaseFilterForm.scss";
import UsaButton from "../util/UsaButton";
import { hasFilters } from "../../redux/selectors";
import {
  SNOOZE_OPTIONS,
  ELIS_CASE_STATUS,
  ELIS_CASE_SUBSTATUS
} from "../../controller/config";
import UsaSelect from "./UsaSelect";
import FormattedDate from "../util/FormattedDate";

type Predicate = "Is" | "Exists" | "Dosen't Exist";
interface PredicateOption {
  text: string;
  value: Predicate;
}
interface Filters {
  [key: string]: {
    value?: string;
    predicate: Predicate;
  };
}

const availableFilters = {
  "Case Created": {
    predicates: [{ text: "In", value: "Is" }] as PredicateOption[],
    options: [
      { text: "2015", value: "2015" },
      { text: "2016", value: "2016" },
      { text: "2017", value: "2017" },
      { text: "2018", value: "2018" },
      { text: "2019", value: "2019" }
    ]
  },
  "Case Status": {
    predicates: [{ text: "Is", value: "Is" }] as PredicateOption[],
    options: ELIS_CASE_STATUS
  },
  "Case Substatus": {
    predicates: [{ text: "Is", value: "Is" }] as PredicateOption[],
    options: ELIS_CASE_SUBSTATUS
  },
  "Due Date": {
    predicates: [{ text: "Is", value: "Is" }] as PredicateOption[],
    options: [{ text: "Overdue", value: "overdue" }]
  },
  Problem: {
    predicates: [
      { text: "Is", value: "Is" },
      { text: "Exists", value: "Exists" },
      { text: "Dosen't Exist", value: "Dosen't Exist" }
    ] as PredicateOption[],
    options: Object.keys(SNOOZE_OPTIONS).map((snoozeReason: string) => {
      return {
        value: snoozeReason as CaseProblem,
        text: SNOOZE_OPTIONS[snoozeReason as CaseProblem].shortText
      };
    })
  },
  "SN Ticket": {
    predicates: [
      { text: "Exists", value: "Exists" },
      { text: "Dosen't Exist", value: "Dosen't Exist" }
    ] as PredicateOption[],
    options: []
  }
};

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
  caseSubstatus: state.caseFilters.caseSubstatus,
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
      setProblemFilter: caseFilterActionCreators.setProblemFilter,
      setServiceNowFilter: caseFilterActionCreators.setServiceNowFilter,
      setSnoozeState: caseFilterActionCreators.setSnoozeState,
      setSearch: caseFilterActionCreators.setSearch,
      setActiveSearch: caseFilterActionCreators.setActiveSearch,
      setCaseStatus: caseFilterActionCreators.setCaseStatus,
      setCaseSubstatus: caseFilterActionCreators.setCaseSubstatus,
      clearFilters: caseFilterActionCreators.clearFilters
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const CaseFilterForm: React.FunctionComponent<Props> = props => {
  const isCaseAgeSelected = () => {
    if (!props.start || !props.end) {
      return false;
    }
    if (
      props.start.getMonth() + 1 === 1 &&
      props.start.getDate() === 1 &&
      props.start.getFullYear() === props.end.getFullYear() &&
      props.end.getMonth() + 1 === 12 &&
      props.end.getDate() === 31
    ) {
      return true;
    }
    return false;
  };

  const defaultFilters: Filters = {};
  if (isCaseAgeSelected() && props.start) {
    defaultFilters["Case Created"] = {
      predicate: "Is",
      value: props.start.getFullYear().toString()
    };
  }
  if (props.caseStatus) {
    defaultFilters["Case Status"] = {
      predicate: "Is",
      value: props.caseStatus
    };
  }
  if (props.caseSubstatus) {
    defaultFilters["Case Substatus"] = {
      predicate: "Is",
      value: props.caseSubstatus
    };
  }
  if (props.snoozeState === "ALARMED") {
    defaultFilters["Due Date"] = {
      predicate: "Is",
      value: "overdue"
    };
  }
  if (props.snoozeState === "TRIAGED") {
    defaultFilters["Problem"] = {
      predicate: "Exists"
    };
  } else if (props.snoozeState === "UNCHECKED") {
    defaultFilters["Problem"] = {
      predicate: "Dosen't Exist"
    };
  } else if (props.snoozeState === "ALL" && props.snoozeReasonFilter) {
    defaultFilters["Problem"] = {
      predicate: "Is",
      value: props.snoozeReasonFilter
    };
  }
  if (props.serviceNowFilter === true) {
    defaultFilters["SN Ticket"] = {
      predicate: "Exists"
    };
  } else if (props.serviceNowFilter === false) {
    defaultFilters["SN Ticket"] = {
      predicate: "Dosen't Exist"
    };
  }

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [addingFilter, setAddingFilter] = useState<boolean>(
    Object.keys(defaultFilters).length < 1
  );
  type filterKey = keyof typeof availableFilters;
  const filterOptions = (Object.keys(availableFilters) as filterKey[]).map(
    f => {
      return { value: f, text: f as string };
    }
  );
  filterOptions.push({
    text: "Filter Type",
    value: (undefined as any) as filterKey
  });

  const availableFilterOptions = filterOptions.filter(
    o => !Object.keys(filters).includes(o.value)
  );

  const onFilterSubmit = () => {
    props.clearCases();
    props.loadCases();
  };

  const onSearch = () => {
    Object.keys(filters).forEach(key => {
      switch (key) {
        case "Case Created":
          const year = Number(filters[key].value);
          props.setStart(new Date(`01/01/${year}`));
          props.setEnd(new Date((year + 1).toString()));
          break;
        case "Case Status":
          props.setCaseStatus(filters[key].value as CaseStatusOptions);
          break;
        case "Case Substatus":
          props.setCaseSubstatus(filters[key].value as CaseSubstatusOptions);
          break;
        case "Due Date":
          props.setSnoozeState("ALARMED");
          break;
        case "Problem":
          switch (filters[key].predicate) {
            case "Is":
              props.setSnoozeState("ALL");
              props.setProblemFilter(filters[key].value as CaseProblem);
              break;
            case "Exists":
              props.setSnoozeState("TRIAGED");
              props.setProblemFilter();
              break;
            case "Dosen't Exist":
              props.setSnoozeState("UNCHECKED");
              props.setProblemFilter();
              break;
            default:
              console.error(
                `${filters[key].predicate} not implamented for ${key}`
              );
          }
          break;
        case "SN Ticket":
          switch (filters[key].predicate) {
            case "Exists":
              props.setServiceNowFilter(true);
              break;
            case "Dosen't Exist":
              props.setServiceNowFilter(false);
              break;
            default:
              console.error(
                `${filters[key].predicate} not implamented for ${key}`
              );
          }
          break;
        default:
          console.error("Search not implamented for", key);
      }
    });
    onFilterSubmit();
  };

  const onSearchId = () => {
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
    setFilters({});
    setAddingFilter(true);
  };

  const onNewFilterSelect = (filter: filterKey) => {
    setAddingFilter(false);
    const newFilters = { ...filters };
    const predicate = availableFilters[filter].predicates[0];
    newFilters[filter] = {
      predicate: predicate.value,
      value:
        predicate.value === "Is"
          ? availableFilters[filter].options[0].value
          : undefined
    };
    setFilters(newFilters);
  };

  const removeFilter = (filter: filterKey) => {
    const newFilters = { ...filters };
    delete newFilters[filter];
    switch (filter) {
      case "Case Created":
        props.setStart();
        props.setEnd();
        break;
      case "Case Status":
        props.setCaseStatus();
        break;
      case "Case Substatus":
        props.setCaseSubstatus();
        break;
      case "Due Date":
        props.setSnoozeState("ALL");
        break;
      case "Problem":
        props.setSnoozeState("ALL");
        props.setProblemFilter();
        break;
      case "SN Ticket":
        props.setServiceNowFilter();
        break;
    }
    if (Object.keys(newFilters).length < 1) {
      setAddingFilter(true);
    }
    setFilters(newFilters);
  };

  const onFilterChange = (oldFilter: filterKey, newFilter: filterKey) => {
    const newFilters = { ...filters };
    delete newFilters[oldFilter];
    const predicate = availableFilters[newFilter].predicates[0];
    newFilters[newFilter] = {
      predicate: predicate.value,
      value:
        predicate.value === "Is"
          ? availableFilters[newFilter].options[0].value
          : undefined
    };
    setFilters(newFilters);
  };

  const onPredicateChange = (name: filterKey, predicate: Predicate) => {
    const newFilters = { ...filters };
    const filter = newFilters[name];
    if (!filter) {
      console.error("Predicate change called on a filter that doesn't exist");
    } else {
      filter.predicate = predicate;
    }
    setFilters(newFilters);
  };

  const onValueChange = (name: filterKey, value: any) => {
    const newFilters = { ...filters };
    const filter = newFilters[name];
    if (!filter) {
      console.error("Value change called on a filter that doesn't exist");
    } else {
      filter.value = value;
    }
    setFilters(newFilters);
  };

  const renderActions = () => (
    <div className="filter-form-actions">
      <UsaButton
        buttonStyle="outline"
        onClick={() => setAddingFilter(true)}
        disabled={availableFilterOptions.length <= 1 || addingFilter}
      >
        Add A Filter
      </UsaButton>
      <div>
        <UsaButton
          buttonStyle="outline"
          onClick={onClear}
          disabled={Object.keys(filters).length < 1}
        >
          Clear
        </UsaButton>
        <UsaButton onClick={onSearch} className="margin-0">
          Search
        </UsaButton>
      </div>
    </div>
  );

  return (
    <div className="filter-form">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1em 0"
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 5px 0" }}>I-90 Aging Cases</h2>
          <FormattedDate label="Last Refresh" date={props.lastUpdated} />
        </div>
        <CaseSearch
          search={props.search}
          onSearchChange={props.setSearch}
          onSearchSubmit={onSearchId}
          onSearchClear={onClear}
        />
      </div>

      <Card header="Search cases by:">
        {(Object.keys(filters) as filterKey[]).map((name: filterKey) => {
          const filter = availableFilters[name];
          const filterValues = filters[name];
          if (!filterValues) return null;
          const filterOptions = availableFilterOptions.filter(
            o => o.value !== undefined
          );
          filterOptions.push({ text: name, value: name });
          return (
            <div className="filter-form-selector">
              <UsaSelect
                options={filterOptions}
                placeholder="Filter Type"
                selected={name}
                name={name}
                onChange={newFilter => onFilterChange(name, newFilter)}
                label=""
              />
              <UsaSelect
                options={filter.predicates}
                placeholder="Filter Type"
                name={`${name}-Predicate`}
                selected={filterValues.predicate}
                onChange={p => onPredicateChange(name, p)}
                label=""
              />
              {filterValues.predicate === "Is" ? (
                <UsaSelect
                  options={filter.options}
                  placeholder="Filter Type"
                  name={`${name}-Value`}
                  onChange={v => onValueChange(name, v)}
                  selected={filterValues.value}
                  label=""
                />
              ) : (
                <div></div>
              )}
              <div className="remove-filter">
                <UsaButton
                  buttonStyle="unstyled"
                  onClick={() => removeFilter(name)}
                >
                  X
                </UsaButton>
              </div>
            </div>
          );
        })}
        {addingFilter ? (
          <div>
            <UsaSelect
              options={availableFilterOptions}
              placeholder="Filter Type"
              name="new filter select"
              onChange={onNewFilterSelect}
              label=""
            />
          </div>
        ) : null}
        {renderActions()}
      </Card>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseFilterForm);
