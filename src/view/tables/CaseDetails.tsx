import React, { useState, useEffect } from "react";
import RestAPIClient from "../../api/RestAPIClient";
import { CaseDetailList } from "./CaseDetailList";
import { Notes } from "./Notes";
import "./CaseDetails.scss";

interface CaseDetailsProps {
  rowData: Case;
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

  return (
    <div style={{ display: "flex" }}>
      <Notes
        caseDetails={caseDetails}
        isLoading={isLoading}
        rowData={props.rowData}
        getCaseDetails={getCaseDetails}
      />
      <span style={{ margin: "0 5px" }}> · </span>
      <CaseDetailList caseDetails={caseDetails} isLoading={isLoading} />
    </div>
  );
};

export { CaseDetails };
