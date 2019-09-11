import React from "react";
import { UsaAlert } from "../util/UsaAlert";

interface DesnoozedWarningProps {
  previouslySnoozedCases: number;
}

const DesnoozedWarning: React.FC<DesnoozedWarningProps> = props => {
  const { previouslySnoozedCases } = props;
  if (!previouslySnoozedCases) {
    return null;
  }

  const casesToRevew = previouslySnoozedCases;
  const pluralS = casesToRevew !== 1 ? "s" : "";
  const pluralCases = casesToRevew !== 1 ? "cases" : "a case";
  const reminder = `You have ${previouslySnoozedCases} reminder${pluralS} to review ${pluralCases} highlighted below.`;

  return <UsaAlert alertType="warning" content={reminder} />;
};

export { DesnoozedWarning };
