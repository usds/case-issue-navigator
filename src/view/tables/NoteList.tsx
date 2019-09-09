import React from "react";
import { DetailNoteDisplay } from "./DetailNoteDisplay";
import { DBNote } from "../../types";
import "./CaseDetails";

interface NoteListProps {
  notes: Array<DBNote>;
}

const NoteList: React.FunctionComponent<NoteListProps> = props => {
  return (
    <React.Fragment>
      <div className="grid-container detail-list">
        <div className="grid-row">
          <h3>Case Issue Notes</h3>
        </div>
        {props.notes.length === 0 && (
          <div className="grid-row">No case issue notes.</div>
        )}
        {props.notes
          .sort(
            (a, b) =>
              new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
          )
          .map(note => {
            return (
              <div className="grid-row">
                <div className="grid-col-auto date">
                  {new Date(note.timestamp).toLocaleDateString("en-US")}
                </div>
                <div className="grid-col content">
                  <DetailNoteDisplay note={note} />
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export { NoteList };
