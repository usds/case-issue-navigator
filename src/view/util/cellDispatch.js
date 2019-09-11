import React from "react";
import { ELIS_CASE_BASE_URL } from "../../controller/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

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
        {rowData && rowData.previouslySnoozed && (
          <React.Fragment>
            &nbsp;
            <FontAwesomeIcon
              icon="exclamation-triangle"
              className="text-accent-warm"
              aria-label="Snooze expired - Please review case"
              data-tip
              data-place="right"
            />
            <ReactTooltip>Snooze expired - Please review case</ReactTooltip>
          </React.Fragment>
        )}
      </>
    );
  },
  DATE: d => {
    const datum = new Date(d);

    if (d && !isNaN(datum)) {
      return (
        datum.getMonth() + 1 + "/" + datum.getDate() + "/" + datum.getFullYear()
      );
    }

    return "Invalid date";
  }
};
