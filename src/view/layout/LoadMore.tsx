import React from "react";
import UsaButton from "../util/UsaButton";

interface Props {
  totalCases: number;
  loadedCases: number;
  isLoading: boolean;
  onClick: () => void;
}

const LoadMore: React.FunctionComponent<Props> = props => {
  const { loadedCases, totalCases, isLoading, onClick } = props;

  const renderLoadMoreAction = () => {
    if (totalCases > loadedCases) {
      return (
        <UsaButton onClick={onClick} disabled={isLoading} buttonStyle="outline">
          {isLoading ? "Loading..." : "Show More"}
        </UsaButton>
      );
    }
    return "There are no more cases on this list.";
  };

  return (
    <div className="display-flex flex-column flex-align-center">
      {renderLoadMoreAction()}
    </div>
  );
};

export default LoadMore;
