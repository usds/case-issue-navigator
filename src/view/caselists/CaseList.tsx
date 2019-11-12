import React from "react";
import UsaButton from "../util/UsaButton";
import ReceiptList from "../tables/ReceiptList";

interface Props {
  isLoading: boolean;
  headers: I90Header[];
  cases: Case[];
  loadMoreCases: () => void;
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

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    const { cases, totalCases, isLoading, headers, loadMoreCases } = this.props;

    return (
      <React.Fragment>
        <ReceiptList cases={cases} isLoading={isLoading} headers={headers} />
        <div className="display-flex flex-column flex-align-center">
          {totalCases > cases.length ? (
            <UsaButton
              onClick={loadMoreCases}
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
