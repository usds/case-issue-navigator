import React, { ReactElement } from "react";
import { CaseDetail } from "../../types";

interface DetailNoteDisplayProps {
  caseDetail: CaseDetail;
}

const DetailNoteDisplay: React.FunctionComponent<
  DetailNoteDisplayProps
> = props => {
  const { caseDetail } = props;
  let content: ReactElement | string = caseDetail.content || "";
  if (caseDetail.subType === "troubleticket" && caseDetail.href) {
    content = (
      <React.Fragment>
        ServiceNow ticket <a href={caseDetail.href}>#{caseDetail.content}</a>{" "}
        was associated with this case.
      </React.Fragment>
    );
  }

  if (caseDetail.subType === "assignee") {
    content = `${caseDetail.content} was assigned to follow-up on this case.`;
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export { DetailNoteDisplay };
