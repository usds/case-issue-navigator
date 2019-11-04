import React from "react";

interface DetailNoteDisplayProps {
  caseDetail: CaseDetail;
}

const DetailNoteDisplay: React.FunctionComponent<
  DetailNoteDisplayProps
> = props => {
  const { caseDetail } = props;

  switch (caseDetail.type) {
    case "COMMENT":
      break;
    case "LINK":
      if (!caseDetail.href) {
        console.error("LINK without href");
        break;
      }
      switch (caseDetail.subType) {
        case "troubleticket":
          return (
            <React.Fragment>
              ServiceNow ticket{" "}
              <a href={caseDetail.href}>{caseDetail.content}</a> was associated
              with this case.
            </React.Fragment>
          );
        default:
          return (
            <React.Fragment>
              Link <a href={caseDetail.href}>{caseDetail.content}</a> was
              associated with this case.
            </React.Fragment>
          );
      }
    case "TAG":
      switch (caseDetail.subType) {
        case "assignee":
          return (
            <React.Fragment>
              {`${caseDetail.content} was assigned to follow-up on this case.`}
            </React.Fragment>
          );
        case "fieldoffice":
          return (
            <React.Fragment>
              {`Stuck at Field Office: ${caseDetail.content}`}
            </React.Fragment>
          );
        case "referral":
          return (
            <React.Fragment>
              {`Referred beacause: ${caseDetail.content}`}
            </React.Fragment>
          );
        default:
          return (
            <React.Fragment>
              {`Tagged as: ${caseDetail.content}`}
            </React.Fragment>
          );
      }
    case "CORRELATION_ID":
      // this should never be reached: the parent component should intercept it
      return null;
  }
  return (
    <React.Fragment>
      {caseDetail.content ? caseDetail.content : ""}
    </React.Fragment>
  );
};

export { DetailNoteDisplay };
