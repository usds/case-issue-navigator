import React, { Component, ReactElement } from "react";
import { Note } from "../../types";

interface DetailDisplayProps {
  note: Note;
}

const DetailDisplay: React.FunctionComponent<DetailDisplayProps> = props => {
  const { note } = props;
  let content: ReactElement | string = note.content;
  if (note.subType === "troubleticket" && note.href) {
    content = (
      <React.Fragment>
        ServiceNow ticket <a href={note.href}>#{note.content}</a> was associated
        with this case.
      </React.Fragment>
    );
  }

  if (note.subType === "assignee") {
    content = `${note.content} was assigned to follow-up on this case.`;
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export { DetailDisplay };
