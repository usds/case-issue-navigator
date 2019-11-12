import React from "react";
import ReceiptList from "../tables/ReceiptList";
// import { DesnoozedWarning } from "../notifications/DesnoozedWarning";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import {
  casesActionCreators,
  loadCases,
  getCaseSummary
} from "../../redux/modules/cases";
import { connect } from "react-redux";
import { appStatusActionCreators } from "../../redux/modules/appStatus";
import LoadMore from "../layout/LoadMore";

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
  headers: I90Header[];
  totalCases: number;
  snoozeState: SnoozeState;
}

type Props = PassedProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface State {
  loading: boolean;
}

class CaseList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidUpdate() {
    if (this.props.isLoading !== this.state.loading) {
      this.setState({ loading: this.props.isLoading });
    }
  }

  loadMoreCases() {
    const { caselist, snoozeState } = this.props;
    const receiptNumber =
      caselist.length > 0
        ? caselist[caselist.length - 1].receiptNumber
        : undefined;
    loadCases(snoozeState, receiptNumber);
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    const { caselist, isLoading, headers } = this.props;

    return (
      <React.Fragment>
        <ReceiptList cases={caselist} isLoading={isLoading} headers={headers} />
        <LoadMore
          totalCases={this.props.totalCases}
          loadedCases={this.props.caselist.length}
          isLoading={this.props.isLoading}
          onClick={this.loadMoreCases}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseList);
