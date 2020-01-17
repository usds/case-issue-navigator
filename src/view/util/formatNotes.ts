import { SNOOZE_OPTIONS } from "../../controller/config";

const formatNotes = (snoozeOption: CallbackState): Array<PartialNote> => {
  const notes: Array<PartialNote> = [];

  if (snoozeOption.caseIssueNotes) {
    notes.push({
      type: "COMMENT",
      content: snoozeOption.caseIssueNotes,
      subType: null
    });
  }

  if (snoozeOption.followUp && snoozeOption.snoozeReason) {
    const type = SNOOZE_OPTIONS[snoozeOption.snoozeReason].type || "COMMENT";
    const subType = SNOOZE_OPTIONS[snoozeOption.snoozeReason].subType || null;

    notes.push({
      type,
      subType,
      content: snoozeOption.followUp
    });
  }

  if (snoozeOption.snoozeReason === "technical_issue" && snoozeOption.subreason) {
    notes.push({
      type: "TAG",
      subType: "subreason",
      content: snoozeOption.subreason
    });
  }

  return notes;
};

export { formatNotes };
