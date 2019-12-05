import React from "react";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { casesActionCreators } from "../../redux/modules/cases";
import { loadCases } from "../../redux/modules/casesAsync";
import { connect } from "react-redux";
import { CaseAgeFilter } from "./CaseAgeFilter";
import { SnoozeReasonFilter } from "./SnoozeReasonFilter";
import { ServiceNowFilter } from "./ServiceNowFilter";
import { Well } from "../util/Well";
import "./CaseFilterForm.scss";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  start: state.cases.caseCreationStart,
  end: state.cases.caseCreationEnd,
  lastUpdated: state.cases.lastUpdated,
  snoozeReasonFilter: state.cases.snoozeReasonFilter,
  serviceNowFilter: state.cases.serviceNowFilter
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      loadCases: loadCases,
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

const CaseFilterForm: React.FunctionComponent<Props> = props => {
  const onFilterSubmit = () => {
    props.clearCases();
    props.loadCases();
  };

  const onSnoozeReasonFilterUpdate = (snoozeReason: SnoozeReason | "") => {
    snoozeReason === ""
      ? props.setSnoozeReasonFilter()
      : props.setSnoozeReasonFilter(snoozeReason);
    onFilterSubmit();
  };

  const onServiceNowFilter = (serviceNowFilter?: boolean) => {
    props.setServiceNowFilter(serviceNowFilter);
    onFilterSubmit();
  };

  return (
    <Well>
      <div className="filter-form">
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
          <ServiceNowFilter
            snoozeState={props.snoozeState}
            serviceNowFilter={props.serviceNowFilter}
            onUpdate={onServiceNowFilter}
          />
        </div>
      </div>
    </Well>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseFilterForm);
