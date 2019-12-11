import React from "react";

interface Props {
  search?: string;
  onSearchChange: (sreach: string) => void;
  onSearchSubmit: () => void;
  onSearchClear: () => void;
}

const CaseSearch: React.FunctionComponent<Props> = props => {
  return (
    <div role="search" className="usa-search usa-search--small">
      <label className="usa-label" htmlFor="receiptNumberSearch">
        Search Receipt/INC
      </label>
      <div className="margin-top-1">
        <input
          className="usa-input width-15"
          id="receiptNumberSearch"
          type="search"
          name="search"
          value={props.search || ""}
          onChange={e => props.onSearchChange(e.target.value)}
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
