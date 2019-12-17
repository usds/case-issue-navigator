import React from "react";
import { UsaAlert } from "../util/UsaAlert";
import "./OverdueCasesWarning.scss";
import UsaButton from "../util/UsaButton";

interface Props {
  overdueCases: number;
  snoozeState: SnoozeState;
  onShowCases: () => void;
}

const OverdueCasesWarning: React.FC<Props> = props => {
  const { overdueCases, snoozeState } = props;

  if (snoozeState !== "ACTIVE") {
    return null;
  }
  if (!overdueCases) {
    return null;
  }

  return (
    <div className="overdue-cases-warning">
      <UsaAlert
        alertType="warning"
        heading={`${overdueCases} Overdue Cases`}
        text={
          <UsaButton buttonStyle="unstyled" onClick={props.onShowCases}>
            View Overdue Cases
          </UsaButton>
        }
      />
    </div>
  );
};

export { OverdueCasesWarning };
