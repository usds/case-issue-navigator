import React from "react";
import NoteUtils from "../../../utils/NoteUtils";

interface Props {
  caseData: Case;
}

export const Assigned: React.FC<Props> = ({ caseData }) => {
  const assignee = NoteUtils.getFollowUp(caseData.notes, "assignee");
  return <React.Fragment>{assignee ? assignee.content : ""}</React.Fragment>;
};
