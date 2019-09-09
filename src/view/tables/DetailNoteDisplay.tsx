import React, { ReactElement } from "react";
import { DBNote } from "../../types";

interface DetailNoteDisplayProps {
  note: DBNote;
}

const DetailNoteDisplay: React.FunctionComponent<
  DetailNoteDisplayProps
> = props => {
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

export { DetailNoteDisplay };
