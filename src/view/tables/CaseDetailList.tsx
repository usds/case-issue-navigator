import React, { useState } from "react";
import { DetailNoteDisplay } from "./DetailNoteDisplay";
import { DetailSnoozeDisplay } from "./DetailSnoozeDisplay";
import "./CaseDetails.scss";
import { ActionModal } from "../../view/util/ActionModal";
import UsaButton from "../../view/util/UsaButton";

interface CaseDetailListProps {
  caseDetails: Array<CaseDetail>;
  isLoading: boolean;
}

const CaseDetailList: React.FC<CaseDetailListProps> = props => {
  const [showDialog, setDialog] = useState(false);
  const openModal = () => setDialog(true);
  const closeModal = () => setDialog(false);

  if (props.isLoading) {
    return <p>Loading...</p>;
  }
  if (props.caseDetails.length === 0) {
    return <p>No case history.</p>;
  }
  return (
    <React.Fragment>
      <ActionModal
        isOpen={showDialog}
        title="Case History"
        closeModal={closeModal}
      >
        <div className="case-history case-detail-list">
          {props.caseDetails.map((caseDetail, index) => {
            if (
              caseDetail.noteOrSnooze === "note" &&
              caseDetail.type === "CORRELATION_ID"
            ) {
              return null;
            }
            return (
              <p key={index}>
                <span className="case-detail-date">
                  {caseDetail.date.toLocaleString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                  })}
                </span>
                <span className="case-detail-creator">
                  {" "}
                  {caseDetail.creator}{" "}
                </span>
                <span className="case-detail-content">
                  {caseDetail.noteOrSnooze === "note" ? (
                    <DetailNoteDisplay caseDetail={caseDetail} />
                  ) : (
                    <DetailSnoozeDisplay caseDetail={caseDetail} />
                  )}
                </span>
              </p>
            );
          })}
        </div>
      </ActionModal>
      <div className="remove-button-margin">
        <UsaButton onClick={openModal} buttonStyle="unstyled">
          Case History
        </UsaButton>
      </div>
    </React.Fragment>
  );
};

export { CaseDetailList };
