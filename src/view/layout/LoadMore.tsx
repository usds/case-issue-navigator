import React from "react";
import UsaButton from "../util/UsaButton";

interface Props {
  isLoading: boolean;
  hasMoreCases: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoadMore: React.FunctionComponent<Props> = props => {
  const { hasMoreCases, isLoading, onClick } = props;

  return hasMoreCases ? (
    <div className="display-flex flex-column flex-align-center">
      <UsaButton onClick={onClick} disabled={isLoading} buttonStyle="outline">
        {isLoading ? "Loading..." : "Show More"}
      </UsaButton>
    </div>
  ) : null;
};

export default LoadMore;
