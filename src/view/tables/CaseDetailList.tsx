import React from "react";
import { DetailNoteDisplay } from "./DetailNoteDisplay";
import { DetailSnoozeDisplay } from "./DetailSnoozeDisplay";
import "./CaseDetails.scss";

interface CaseDetailListProps {
  caseDetails: Array<CaseDetail>;
}

const CaseDetailList: React.FC<CaseDetailListProps> = props => {
  return (
    <div className="case-detail-list">
      {props.caseDetails.map((caseDetail, index) => {
        if (
          caseDetail.noteOrSnooze === "note" &&
          caseDetail.type === "CORRELATION_ID"
        ) {
          return null;
        }
        return (
          <React.Fragment key={index}>
            <div className="case-detail-date">
              {caseDetail.date.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
              })}
            </div>
            <div className="case-detail-creator">{caseDetail.creator} </div>
            <div className="case-detail-content">
              {caseDetail.noteOrSnooze === "note" ? (
                <DetailNoteDisplay caseDetail={caseDetail} />
              ) : (
                <DetailSnoozeDisplay caseDetail={caseDetail} />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export { CaseDetailList };
