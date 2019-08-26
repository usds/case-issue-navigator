import React from "react";
import { NoteList } from "./NoteList";
import { DBNote } from "../../types";

interface CaseDetailsProps {
  notes: Array<DBNote>;
  numberOfColumns: number;
}

const CaseDetails: React.FunctionComponent<CaseDetailsProps> = props => {
  return (
    <React.Fragment>
      <tr className="row--show-details ">
        <td colSpan={props.numberOfColumns} className="bg-primary-light">
          <h3>View Details</h3>
        </td>
      </tr>
      {props.notes && props.notes.length > 0 ? (
        <NoteList notes={props.notes} numberOfColumns={props.numberOfColumns} />
      ) : (
        <tr className="row--show-details">
          <td colSpan={props.numberOfColumns}>No details available.</td>
        </tr>
      )}
    </React.Fragment>
  );
};

export { CaseDetails };
