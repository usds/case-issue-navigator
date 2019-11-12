import React from "react";
import UsaButton from "../util/UsaButton";
import ReceiptList from "../tables/ReceiptList";

interface Props {
  isLoading: boolean;
  headers: I90Header[];
  caselist: Case[];
  loadCases: (
    type: SnoozeState,
    lastReceiptNumber?: string | undefined
  ) => (args: any) => Promise<void>;
  totalCases: number;
}

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

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    const { caselist, totalCases, isLoading, headers } = this.props;

    return (
      <React.Fragment>
        <ReceiptList cases={caselist} isLoading={isLoading} headers={headers} />
        <div className="display-flex flex-column flex-align-center">
          {totalCases > caselist.length ? (
            <UsaButton
              onClick={this.loadMoreCases.bind(this)}
              disabled={isLoading}
              buttonStyle="outline"
            >
              {isLoading ? "Loading..." : "Show More"}
            </UsaButton>
          ) : (
            "There are no more cases on this list."
          )}
        </div>
      </React.Fragment>
    );
  }
}

export { CaseList };
