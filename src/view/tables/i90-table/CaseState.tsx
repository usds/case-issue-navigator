import React from "react";
import ReactTooltip from "react-tooltip";
import CaseUtils from "../../../utils/CaseUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  caseData: Case;
}

export const CaseState: React.FC<Props> = ({ caseData }) => {
  const reason = CaseUtils.getProblem(caseData);
  if (!reason) {
    return (
      <div style={{ marginRight: "5px", marginTop: "-3px" }}>
        <div
          className={`usa-tag bg-base-lighter`}
          style={{
            textTransform: "none",
            whiteSpace: "nowrap",
            height: "25px",
            width: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          data-tip={`Unkown aging case`}
          data-for="Untouched"
        >
          &nbsp;
          <ReactTooltip id="Untouched"></ReactTooltip>
        </div>
      </div>
    );
  }
  if (CaseUtils.isResolved(caseData)) {
    return (
      <div style={{ marginRight: "5px", marginTop: "-3px" }}>
        <div
          className={`usa-tag bg-green`}
          style={{
            textTransform: "none",
            whiteSpace: "nowrap",
            height: "25px",
            width: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          data-tip={`Resolved`}
          data-for="resolved"
        >
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          <ReactTooltip id="resolved"></ReactTooltip>
        </div>
      </div>
    );
  }
  if (CaseUtils.isOverDue(caseData)) {
    return (
      <div style={{ marginRight: "5px", marginTop: "-3px" }}>
        <div
          className={`usa-tag bg-accent-warm-dark`}
          style={{
            textTransform: "none",
            whiteSpace: "nowrap",
            height: "25px",
            width: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          data-tip={`overdue`}
          data-for="overdue"
        >
          <FontAwesomeIcon icon={faExclamation}></FontAwesomeIcon>
          <ReactTooltip id="overdue"></ReactTooltip>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginRight: "5px", marginTop: "-3px" }}>
      <div
        className={`usa-tag`}
        style={{
          textTransform: "none",
          whiteSpace: "nowrap",
          height: "25px",
          width: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        data-tip={`identified`}
        data-for="identified"
      >
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        <ReactTooltip id="identified"></ReactTooltip>
      </div>
    </div>
  );
};
