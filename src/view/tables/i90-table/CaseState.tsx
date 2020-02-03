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
      <div style={{ marginRight: "5px" }}>
        <span
          className={`usa-tag bg-base-lighter`}
          style={{
            textTransform: "none",
            whiteSpace: "nowrap"
          }}
          data-tip={`Unkown aging case`}
          data-for="Untouched"
        >
          &nbsp;
          <ReactTooltip id="Untouched"></ReactTooltip>
        </span>
      </div>
    );
  }
  if (CaseUtils.isResolved(caseData)) {
    return (
      <div style={{ marginRight: "5px" }}>
        <span
          className={`usa-tag`}
          style={{
            textTransform: "none",
            whiteSpace: "nowrap"
          }}
          data-tip={`Resolved`}
          data-for="resolved"
        >
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          <ReactTooltip id="resolved"></ReactTooltip>
        </span>
      </div>
    );
  }
  if (CaseUtils.isOverDue(caseData)) {
    return (
      <div style={{ marginRight: "5px" }}>
        <span
          className={`usa-tag bg-accent-warm`}
          style={{
            textTransform: "none",
            whiteSpace: "nowrap"
          }}
          data-tip={`overdue`}
          data-for="overdue"
        >
          <FontAwesomeIcon icon={faExclamation}></FontAwesomeIcon>
          <ReactTooltip id="overdue"></ReactTooltip>
        </span>
      </div>
    );
  }
  return (
    <div style={{ marginRight: "5px" }}>
      <span
        className={`usa-tag`}
        style={{
          textTransform: "none",
          whiteSpace: "nowrap"
        }}
        data-tip={`identified`}
        data-for="identified"
      >
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        <ReactTooltip id="identified"></ReactTooltip>
      </span>
    </div>
  );
};
