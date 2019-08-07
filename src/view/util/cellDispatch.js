import React from "react";
import { ELIS_CASE_BASE_URL } from "../../controller/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const cellDispatch = {
  LINK: (r, rowData) => (
    <>
      <a href={ELIS_CASE_BASE_URL + r} target="_elis_viewer">
        {r}
      </a>
      {rowData.desnoozed ? (
        <FontAwesomeIcon
          icon="exclamation-triangle"
          className="text-accent-warm"
        />
      ) : null}
    </>
  ),
  DATE: d => {
    const datum = new Date(d);
    return (
      datum.getMonth() + 1 + "/" + datum.getDate() + "/" + datum.getFullYear()
    );
  }
};
