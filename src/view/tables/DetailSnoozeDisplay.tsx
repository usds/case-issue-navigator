import React from "react";
import { CaseDetail, SnoozeReason } from "../../types";
import { SNOOZE_OPTIONS } from "../../controller/config";

interface DetailSnoozeDisplayProps {
  caseDetail: CaseDetail;
}

const DetailSnoozeDisplay: React.FunctionComponent<
  DetailSnoozeDisplayProps
> = props => {
  const { caseDetail } = props;
  const snoozeReason = caseDetail.snoozeReason;
  const translatedReason = SNOOZE_OPTIONS[snoozeReason as SnoozeReason]
    ? SNOOZE_OPTIONS[snoozeReason as SnoozeReason].snoozeReason
    : caseDetail.snoozeReason;
  return (
    <React.Fragment>
      {caseDetail.type === "snoozeStart"
        ? `Snooze started for reason "${translatedReason}."`
        : `Snooze ended for reason "${translatedReason}."`}
    </React.Fragment>
  );
};

export { DetailSnoozeDisplay };
