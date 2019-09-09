import React, { useState, useEffect } from "react";
import { NoteList } from "./NoteList";
import { DBNote, SnoozeEvent, SnoozeInformation } from "../../types";
import RestAPIClient from "../../model/RestAPIClient";
import { SnoozeHistoryList } from "./SnoozeHistoryList";
import "./CaseDetails.scss";

interface CaseDetailsProps {
  receiptNumber: string;
  numberOfColumns: number;
}

const CaseDetails: React.FunctionComponent<CaseDetailsProps> = props => {
  const [notes, setNotes] = useState<Array<DBNote>>([]);
  const [snoozeEvents, setSnoozeEvents] = useState<Array<SnoozeEvent>>([]);
  const { receiptNumber } = props;

  useEffect(() => {
    const getCaseDetails = async () => {
      const response = await RestAPIClient.cases.getCaseDetails(receiptNumber);
      if (response.succeeded) {
        setNotes(response.payload.notes as Array<DBNote>);
        setSnoozeEvents(
          response.payload.snoozes.reduce(
            (agg: Array<SnoozeEvent>, snooze: SnoozeInformation) => {
              agg.push({
                date: new Date(snooze.snoozeStart),
                startOrEnd: "start",
                snoozeReason: snooze.snoozeReason
              });
              if (new Date(snooze.snoozeEnd) < new Date()) {
                agg.push({
                  date: new Date(snooze.snoozeEnd),
                  startOrEnd: "end",
                  snoozeReason: snooze.snoozeReason
                });
              }
              return agg;
            },
            []
          )
        );
      }
    };
    getCaseDetails();
  }, [receiptNumber]);

  return (
    <React.Fragment>
      <tr className="row--show-details">
        <td colSpan={1}></td>
        <td colSpan={props.numberOfColumns - 1}>
          <div className="grid-container">
            <div className="grid-row">
              <div className="grid-col-auto snooze-list">
                <SnoozeHistoryList snoozeEvents={snoozeEvents} />
              </div>
              <div className="grid-col">
                <NoteList notes={notes} />
              </div>
            </div>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export { CaseDetails };
