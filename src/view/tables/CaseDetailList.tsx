import React from "react";
import { DetailNoteDisplay } from "./DetailNoteDisplay";
import { DetailSnoozeDisplay } from "./DetailSnoozeDisplay";
import "./CaseDetails.scss";

interface CaseDetailListProps {
  caseDetails: Array<CaseDetail>;
}

const CaseDetailList: React.FC<CaseDetailListProps> = props => {
  return (
    <div className="grid-container case-detail-list">
      {props.caseDetails.map((caseDetail, index) => {
        if (
          caseDetail.noteOrSnooze === "note" &&
          caseDetail.type === "CORRELATION_ID"
        ) {
          return null;
        }
        return (
          <div className="grid-row" key={index}>
            <div className="grid-col-auto case-detail-date">
              {caseDetail.date.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
              })}
            </div>
            <div className="grid-col">
              {caseDetail.noteOrSnooze === "note" ? (
                <DetailNoteDisplay caseDetail={caseDetail} />
              ) : (
                <DetailSnoozeDisplay caseDetail={caseDetail} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { CaseDetailList };
