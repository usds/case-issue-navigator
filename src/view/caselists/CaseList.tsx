import React from "react";
import UsaButton from "../util/UsaButton";
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
    const caselist = this.props.caselist;
    const receiptNumber =
      caselist.length > 0
        ? caselist[caselist.length - 1].receiptNumber
        : undefined;
    this.props.loadCases("snoozed", receiptNumber);
  }

  renderLoadMoreAction() {
    const { caselist, totalCases, isLoading } = this.props;
    if (totalCases > caselist.length) {
      return (
        <UsaButton
          onClick={this.loadMoreCases.bind(this)}
          disabled={isLoading}
          buttonStyle="outline"
        >
          {isLoading ? "Loading..." : "Show More"}
        </UsaButton>
      );
    }
    return "There are no more cases on this list.";
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    const { caselist, totalCases, isLoading, headers } = this.props;

    return (
      <React.Fragment>
        <ReceiptList cases={caselist} isLoading={isLoading} headers={headers} />
        <div className="display-flex flex-column flex-align-center">
          {this.renderLoadMoreAction()}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseList);
