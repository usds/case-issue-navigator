import React from "react";

interface Props {
  label: string;
}

export const UsaSearch: React.FC<Props> = ({ label }) => (
  <div className="usa-search usa-search--small">
    <label className="usa-label margin-bottom-1" htmlFor="search-field-small">
      {label}
    </label>
    <div role="search">
      <input
        className="usa-input"
        style={{ width: "auto" }}
        id="search-field-small"
        type="search"
        name="search"
      />
      <button className="usa-button" type="submit">
        <span className="usa-sr-only">Search</span>
      </button>
    </div>
  </div>
);
