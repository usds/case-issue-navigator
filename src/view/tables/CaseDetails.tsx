import React, { useState, useEffect } from "react";
import { DBNote, SnoozeInformation, CaseDetail } from "../../types";
import RestAPIClient from "../../model/RestAPIClient";
import { CaseDetailList } from "./CaseDetailList";
import "./CaseDetails.scss";

interface CaseDetailsProps {
  receiptNumber: string;
  numberOfColumns: number;
}

const CaseDetails: React.FunctionComponent<CaseDetailsProps> = props => {
  const [caseDetails, setCaseDetails] = useState<Array<CaseDetail>>([]);
  const { receiptNumber } = props;

  useEffect(() => {
    const getCaseDetails = async () => {
      const response = await RestAPIClient.cases.getCaseDetails(receiptNumber);
      if (response.succeeded) {
        const caseEvents: Array<CaseDetail> = [];
        response.payload.notes.forEach((note: DBNote) => {
          caseEvents.push({
            date: new Date(note.timestamp),
            noteOrSnooze: "note",
            type: note.type,
            subType: note.subType,
            href: note.href,
            content: note.content
          });
        });
        response.payload.snoozes.forEach((snooze: SnoozeInformation) => {
          caseEvents.push({
            noteOrSnooze: "snooze",
            date: new Date(snooze.snoozeStart),
            type: "snoozeStart",
            snoozeReason: snooze.snoozeReason
          });
          if (new Date(snooze.snoozeEnd) < new Date()) {
            caseEvents.push({
              noteOrSnooze: "snooze",
              date: new Date(snooze.snoozeEnd),
              type: "snoozeEnd",
              snoozeReason: snooze.snoozeReason
            });
          }
        });
        setCaseDetails(
          caseEvents.sort((a, b) => b.date.valueOf() - a.date.valueOf())
        );
      }
    };
    getCaseDetails();
  }, [receiptNumber]);

  return (
    <React.Fragment>
      <tr className="row--detail-display">
        <td colSpan={1}></td>
        <td colSpan={props.numberOfColumns - 1}>
          <h3>Case Details</h3>
          {caseDetails.length === 0 ? (
            <p>No case details.</p>
          ) : (
            <CaseDetailList caseDetails={caseDetails} />
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};

export { CaseDetails };
