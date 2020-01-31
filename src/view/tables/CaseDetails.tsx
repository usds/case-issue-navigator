import React, { useState, useEffect } from "react";
import RestAPIClient from "../../api/RestAPIClient";
import { AddNoteForm } from "../../controller/AddNoteForm";
import { CaseDetailList } from "./CaseDetailList";
import DateUtils from "../../utils/DateUtils";
import "./CaseDetails.scss";

interface CaseDetailsProps {
  rowData: Case;
  numberOfColumns: number;
}

const CaseDetails: React.FunctionComponent<CaseDetailsProps> = props => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [caseDetails, setCaseDetails] = useState<Array<CaseDetail>>([]);
  const receiptNumber = props.rowData.receiptNumber;

  const getCaseDetails = async () => {
    const response = await RestAPIClient.caseDetails.getCaseDetails(
      receiptNumber
    );
    if (response.succeeded) {
      const caseEvents: Array<CaseDetail> = [];
      response.payload.notes.forEach((note: Note) => {
        caseEvents.push({
          date: new Date(note.timestamp),
          noteOrSnooze: "note",
          type: note.type,
          subType: note.subType,
          href: note.href,
          content: note.content,
          creator: note.user.name
        });
      });
      response.payload.snoozes.forEach((snooze: SnoozeInformation) => {
        caseEvents.push({
          noteOrSnooze: "snooze",
          date: new Date(snooze.snoozeStart),
          type: "snoozeStart",
          snoozeReason: snooze.snoozeReason,
          creator: snooze.user.name
        });
        if (new Date(snooze.snoozeEnd) < new Date()) {
          caseEvents.push({
            noteOrSnooze: "snooze",
            date: new Date(snooze.snoozeEnd),
            type: "snoozeEnd",
            snoozeReason: snooze.snoozeReason,
            creator: snooze.user.name
          });
        }
      });
      setCaseDetails(
        caseEvents.sort((a, b) => b.date.valueOf() - a.date.valueOf())
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCaseDetails();
  }, [props.rowData]); // eslint-disable-line react-hooks/exhaustive-deps

  const notesSection = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="case-detail-list">
        {caseDetails.reverse().map((caseDetail, index) => {
          if (
            caseDetail.noteOrSnooze !== "note" ||
            caseDetail.type !== "COMMENT"
          ) {
            return null;
          }
          return (
            <React.Fragment key={index}>
              <span className="case-detail-creator">{caseDetail.creator} </span>
              <span className="case-detail-date">
                {DateUtils.badgeFormat(caseDetail.date.toString()) +
                  ", " +
                  caseDetail.date.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit"
                  })}
              </span>
              <div className="case-detail-content">
                {caseDetail.content ? caseDetail.content : ""}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <React.Fragment>
      <tr className="row--detail-display">
        <td colSpan={1}></td>
        <td colSpan={props.numberOfColumns - 1}>
          {/* <p>
            <b>Application Reason</b>:{" "}
            {props.rowData.extraData.applicationReason}
          </p>
          <p>
            <b>Platfrom</b>:{" "}
            {String(props.rowData.extraData.i90SP) === "true" ? "SP" : "Legacy"}
          </p> */}
          <CaseDetailList caseDetails={caseDetails} isLoading={isLoading} />
          <hr />
          <h3>Notes</h3>
          {notesSection()}
          <AddNoteForm
            rowData={props.rowData}
            getCaseDetails={getCaseDetails}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export { CaseDetails };
