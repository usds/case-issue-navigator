import React from "react";
import UsaSelect from "./UsaSelect";
import UsaTextInput from "./UsaTextInput";
import UsaNumberInput from "./UsaNumberInput";
import AddNoteInput from "./AddNoteInput";

const technicalSubtypes: TechnicalSubtype[] = [
  {
    value: "tecs_check",
    text: "Cannot refresh TECS Check"
  },
  {
    value: "undo_referral",
    text: "Undo referral"
  },
  {
    value: "unable_to_update_dob",
    text: "Unable to Update DOB"
  },
  {
    value: "unable_to_update_address",
    text: "Unable to update address"
  },
  {
    value: "unable_to_assign",
    text: "Unable to assign/un-assign"
  },
  {
    value: "card_production_error",
    text: "Card Production Error"
  },
  {
    value: "stuck_in_a_state",
    text: "Case stuck in current state, and needs to be pushed to next phase"
  },
  {
    value: "needs_to_be_closed",
    text: "Needs to be Closed"
  }
];

interface Props {
  options: SnoozeOptionValue[];
  selectedOption: SnoozeOptionValue;
  followUpChange: (value: string) => void;
  snoozeReasonChange: (value: SnoozeReason) => void;
  subreasonChange: (value: Subreason) => void;
  caseIssueNotesChange: (value: string) => void;
  durationChange: (value?: number) => void;
  setError: (key: string, value: string) => void;
  deleteError: (key: string) => void;
  subreason: Subreason | undefined;
  followUp: string;
  caseIssueNotes: string;
  duration: number | undefined;
}

export default function SnoozeInputs(props: Props) {
  const subReason = () => {
    if (props.selectedOption.value !== "technical_issue") {
      return null;
    }
    return (
      <UsaSelect
        options={technicalSubtypes}
        placeholder="- Select Specific Issue -"
        name="technicalSubtype"
        selected={props.subreason}
        onChange={props.subreasonChange}
        label="Specific Issue"
      />
    );
  };
  const followUpFragment = () => {
    if (!props.selectedOption.followUp) {
      return null;
    }
    return (
      <UsaTextInput
        onChange={props.followUpChange}
        name="followUp"
        value={props.followUp}
        label={props.selectedOption.followUp}
      />
    );
  };

  return (
    <React.Fragment>
      <UsaSelect
        options={props.options.map(opt => ({
          ...opt,
          text: opt.snoozeReason
        }))}
        placeholder="- Select Reason -"
        name="snoozeReason"
        selected={props.selectedOption.value}
        onChange={props.snoozeReasonChange}
        label="Problem"
      />
      {subReason()}
      {followUpFragment()}
      <UsaNumberInput
        onChange={props.durationChange}
        name="duration"
        value={props.duration}
        label="Due in (days)"
        min={1}
        max={365}
        setError={props.setError}
        deleteError={props.deleteError}
        requiredText="Enter a number of days to snooze"
      />
      <AddNoteInput
        onChange={props.caseIssueNotesChange}
        value={props.caseIssueNotes}
      />
    </React.Fragment>
  );
}
