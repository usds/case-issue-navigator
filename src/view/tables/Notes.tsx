import React, { useState } from "react";
import "./CaseDetails.scss";
import { ActionModal } from "../../view/util/ActionModal";
import UsaButton from "../../view/util/UsaButton";
import DateUtils from "../../utils/DateUtils";
import { AddNoteForm } from "../../controller/AddNoteForm";

interface Props {
  caseDetails: Array<CaseDetail>;
  isLoading: boolean;
  rowData: Case;
  getCaseDetails: any;
}

const Notes: React.FC<Props> = props => {
  const [showDialog, setDialog] = useState(false);
  const openModal = () => setDialog(true);
  const closeModal = () => setDialog(false);

  if (props.isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <ActionModal isOpen={showDialog} title="Notes" closeModal={closeModal}>
        <div className="case-detail-list">
          {props.caseDetails.reverse().map((caseDetail, index) => {
            if (
              caseDetail.noteOrSnooze !== "note" ||
              caseDetail.type !== "COMMENT"
            ) {
              return null;
            }
            return (
              <React.Fragment key={index}>
                <span className="case-detail-creator">
                  {caseDetail.creator}{" "}
                </span>
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
        <AddNoteForm
          rowData={props.rowData}
          getCaseDetails={props.getCaseDetails}
        />
      </ActionModal>
      <span className="remove-button-margin">
        <UsaButton onClick={openModal} buttonStyle="unstyled">
          Notes
        </UsaButton>
      </span>
    </React.Fragment>
  );
};

export { Notes };
