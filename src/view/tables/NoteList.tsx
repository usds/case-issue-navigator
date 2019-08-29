import React from "react";
import { DBNote } from "../../types";
import { DetailNoteDisplay } from "./DetailNoteDisplay";

interface NoteListProps {
  notes: Array<DBNote>;
  numberOfColumns: number;
}

const NoteList: React.FunctionComponent<NoteListProps> = props => {
  return (
    <React.Fragment>
      {props.notes
        .sort(
          (a, b) =>
            new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
        )
        .map(note => {
          return (
            <tr className="row--show-details">
              <td colSpan={2}>
                <strong>
                  {new Date(note.timestamp).toLocaleDateString("en-US")}
                </strong>
              </td>
              <td colSpan={props.numberOfColumns - 2}>
                <DetailNoteDisplay note={note} />
              </td>
            </tr>
          );
        })}
    </React.Fragment>
  );
};

export { NoteList };
