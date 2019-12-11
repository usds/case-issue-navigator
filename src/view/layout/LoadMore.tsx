import React from "react";
import UsaButton from "../util/UsaButton";

interface Props {
  isLoading: boolean;
  hasMoreCases: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoadMore: React.FunctionComponent<Props> = props => {
  const { hasMoreCases, isLoading, onClick } = props;

  const renderLoadMoreAction = () => {
    if (hasMoreCases) {
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
