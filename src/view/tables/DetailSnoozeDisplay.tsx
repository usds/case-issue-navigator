import React from "react";
import { SNOOZE_OPTIONS } from "../../controller/config";

interface DetailSnoozeDisplayProps {
  caseDetail: CaseDetail;
}

const DetailSnoozeDisplay: React.FunctionComponent<
  DetailSnoozeDisplayProps
> = props => {
  const { caseDetail } = props;
  const snoozeReason = caseDetail.snoozeReason;
  const translatedReason = SNOOZE_OPTIONS[snoozeReason as CaseProblem]
    ? SNOOZE_OPTIONS[snoozeReason as CaseProblem].snoozeReason
    : caseDetail.snoozeReason;
  return (
    <React.Fragment>
      {caseDetail.type === "snoozeStart"
        ? `Triaged as "${translatedReason}."`
        : `Snooze ended for reason "${translatedReason}."`}
    </React.Fragment>
  );
};

export { DetailSnoozeDisplay };
