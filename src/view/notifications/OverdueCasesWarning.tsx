import React from "react";
import { UsaAlert } from "../util/UsaAlert";

interface Props {
  overdueCases: number;
  snoozeState: SnoozeState;
}

const OverdueCasesWarning: React.FC<Props> = props => {
  const { overdueCases, snoozeState } = props;

  if (snoozeState !== "ACTIVE") {
    return null;
  }
  if (!overdueCases) {
    return null;
  }

  const pluralS = overdueCases !== 1 ? "s" : "";
  const pluralCases = overdueCases !== 1 ? "cases" : "a case";
  const reminder = `You have ${overdueCases} reminder${pluralS} to review ${pluralCases} highlighted below.`;

  return <UsaAlert alertType="warning">{reminder}</UsaAlert>;
};

export { OverdueCasesWarning };
