import React from "react";
import { CaseList } from "./CaseList";
import { connect } from "react-redux";
import { RootState } from "../../redux/create";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import {
  casesActionCreators,
  loadCases,
  getCaseSummary
} from "../../redux/modules/cases";
import { appStatusActionCreators } from "../../redux/modules/appStatus";

const mapStateToProps = (state: RootState) => ({
  caselist: state.cases.caselist,
  isLoading: state.cases.isLoading,
  summary: state.cases.summary
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      removeCase: casesActionCreators.removeCase,
      toggleDetails: casesActionCreators.toggleDetails,
      loadCases: loadCases,
      setCases: casesActionCreators.setCases,
      setCaseType: casesActionCreators.setCaseType,
      setNotification: appStatusActionCreators.setNotification,
      setError: appStatusActionCreators.setDataLoadError,
      getSummary: getCaseSummary,
      clearCases: casesActionCreators.clearCases
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface State {
  loading: boolean;
}

class UnconnectedSnoozedCaseList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.props.clearCases();
    this.props.setCaseType("snoozed");
    this.props.loadCases("snoozed");
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
    loadCases("snoozed", receiptNumber);
  }

  onSnoozeUpdate(
    receiptNumber: string,
    newNotes: DBNote[],
    snoozeInformation: SnoozeInformation
  ) {
    const snoozedCases = this.props.caselist
      .map(snoozedCase => {
        if (snoozedCase.receiptNumber === receiptNumber) {
          const notes = snoozedCase.notes
            ? snoozedCase.notes.concat(newNotes)
            : newNotes;
          return {
            ...snoozedCase,
            snoozeInformation: snoozeInformation,
            notes
          };
        }
        return snoozedCase;
      })
      .sort((a, b) => {
        return (
          new Date(
            (a.snoozeInformation as SnoozeInformation).snoozeEnd
          ).getTime() -
          new Date().getTime() -
          (new Date(
            (b.snoozeInformation as SnoozeInformation).snoozeEnd
          ).getTime() -
            new Date().getTime())
        );
      });

    if (
      snoozedCases[snoozedCases.length - 1].receiptNumber === receiptNumber &&
      snoozedCases.length < this.props.summary["SNOOZED_CASES"]
    ) {
      snoozedCases.pop();
    }

    this.props.setCases(snoozedCases);
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    const {
      toggleDetails,
      getSummary,
      setError,
      setNotification,
      removeCase,
      isLoading,
      summary
    } = this.props;
    return (
      <CaseList
        cases={this.props.caselist}
        headers={[
          { key: "showDetails", props: { toggleDetails } },
          { key: "receiptNumber" },
          { key: "caseAge" },
          { key: "applicationReason" },
          { key: "platform" },
          { key: "problem" },
          { key: "snoozed" },
          { key: "assigned" },
          { key: "SNTicket" },
          {
            key: "snoozeActions",
            props: {
              updateSummaryData: getSummary,
              onSnoozeUpdate: this.onSnoozeUpdate.bind(this),
              setError,
              setNotification,
              removeCase
            }
          }
        ]}
        isLoading={isLoading}
        totalCases={summary.SNOOZED_CASES}
        loadMoreCases={this.loadMoreCases.bind(this)}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedSnoozedCaseList);
