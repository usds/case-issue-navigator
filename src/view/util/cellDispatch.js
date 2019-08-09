import React from "react";
import { ELIS_CASE_BASE_URL } from "../../controller/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const cellDispatch = {
  LINK: (r, rowData) => {
    if (!r) {
      return null;
    }

    return (
      <>
        <a href={ELIS_CASE_BASE_URL + r} target="_elis_viewer">
          {r}
        </a>
        {rowData && rowData.desnoozed ? (
          <FontAwesomeIcon
            icon="exclamation-triangle"
            className="text-accent-warm"
          />
        ) : null}
      </>
    );
  },
  DATE: d => {
    const datum = new Date(d);
    if (typeof d !== "string" || isNaN(datum.getMonth())) {
      return "Invalid date";
    }

    return (
      datum.getMonth() + 1 + "/" + datum.getDate() + "/" + datum.getFullYear()
    );
  }
};
