import React from "react";

interface Props {
  search?: string;
  onSearchChange: (sreach: string) => void;
  onSearchSubmit: () => void;
  onSearchClear: () => void;
}

const CaseSearch: React.FunctionComponent<Props> = props => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onSearchSubmit()
    }
  }
  return (
    <div role="search" className="usa-search usa-search--small">
      <div className="margin-top-1">
        <input
          className="usa-input"
          id="receiptNumberSearch"
          type="search"
          name="search"
          value={props.search || ""}
          onKeyPress={handleKeyPress}
          onChange={e => props.onSearchChange(e.target.value)}
          placeholder="Search Receipt/INC"
          style={{ width: "160px" }}
        />
        <button
          className="usa-button"
          type="submit"
          onClick={props.onSearchSubmit}
        >
          <span className="usa-sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};

export { CaseSearch };
