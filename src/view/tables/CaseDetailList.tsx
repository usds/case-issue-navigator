import React from "react";
import { CaseDetail } from "../../types";
import { DetailNoteDisplay } from "./DetailNoteDisplay";
import { DetailSnoozeDisplay } from "./DetailSnoozeDisplay";

interface CaseDetailListProps {
  caseDetails: Array<CaseDetail>;
}

const CaseDetailList: React.FC<CaseDetailListProps> = props => {
  return (
    <div className="grid-container">
      {props.caseDetails.map(caseDetail => {
        return (
          <div className="grid-row">
            <div className="grid-col-auto date">
              {caseDetail.date.toLocaleString()}
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
