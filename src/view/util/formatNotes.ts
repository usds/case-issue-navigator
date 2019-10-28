import { SNOOZE_OPTIONS } from "../../controller/config";

const formatNotes = (snoozeOption: CallbackState): Array<Note> => {
  const notes: Array<Note> = [];

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

  return notes;
};

export { formatNotes };
