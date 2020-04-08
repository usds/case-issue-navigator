import React from "react";
import NoteUtils from "../../../utils/NoteUtils";

interface Props {
  caseData: Case;
}

export const ServiceNowTicket: React.FC<Props> = ({ caseData }) => {
  const ticket = NoteUtils.getFollowUp(caseData.notes, "troubleticket");
  if (ticket == null) {
    return null;
  }
  return (
    <React.Fragment key={ticket.content}>
      <a
        href={ticket.href ? ticket.href : undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="usa-button  usa-button--unstyled"
        style={{ height: "14px", marginTop: "2px" }}
      >
        {ticket.content}
      </a>
      <span style={{ margin: "0 5px" }}> · </span>
    </React.Fragment>
  );
};
