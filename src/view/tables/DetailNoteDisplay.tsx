import React, { ReactElement } from "react";

interface DetailNoteDisplayProps {
  caseDetail: CaseDetail;
}

const DetailNoteDisplay: React.FunctionComponent<
  DetailNoteDisplayProps
> = props => {
  const { caseDetail } = props;

  switch (caseDetail.subType) {
    case "troubleticket":
      if (caseDetail.href) {
        return (
          <React.Fragment>
            ServiceNow ticket{" "}
            <a href={caseDetail.href}>#{caseDetail.content}</a> was associated
            with this case.
          </React.Fragment>
        );
      } else {
        console.error("Attemptrouble case without href");
        break;
      }
    case "assignee":
      return (
        <React.Fragment>
          {caseDetail.content} was assigned to follow-up on this case.
        </React.Fragment>
      );
    case "fieldoffice":
      return (
        <React.Fragment>
          Stuck at Field Office: {caseDetail.content}
        </React.Fragment>
      );
    case "referral":
      return (
        <React.Fragment>Referred beacause: {caseDetail.content}</React.Fragment>
      );
  }
  return (
    <React.Fragment>
      {caseDetail.content ? caseDetail.content : ""}
    </React.Fragment>
  );
};

export { DetailNoteDisplay };
