import React from "react";
import UsaTextInput from "./UsaTextInput";
import UsaButton from "../util/UsaButton";

interface Props {
  search?: string;
  onSearchChange: (sreach: string) => void;
  onSearchSubmit: () => void;
  onSearchClear: () => void;
}

const CaseSearch: React.FunctionComponent<Props> = props => {
  return (
    <React.Fragment>
      <UsaTextInput
        name="receiptNumberSearch"
        value={props.search || ""}
        onChange={props.onSearchChange}
        label="Search Receipt/INC"
      />
      <UsaButton buttonStyle="base" onClick={props.onSearchSubmit}>
        Search
      </UsaButton>
      <UsaButton buttonStyle="base" onClick={props.onSearchClear}>
        Clear
      </UsaButton>
    </React.Fragment>
  );
};

export { CaseSearch };
