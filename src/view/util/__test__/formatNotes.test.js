import { formatNotes } from "../formatNotes";

describe("formatNotes", () => {
  it("should return an empty notes array for no snoozeOption", () => {
    const snoozeOption = {};
    const notes = formatNotes(snoozeOption);
    expect(notes).toEqual([]);
  });
  it("should create a basic comment note", () => {
    const snoozeOption = {
      caseIssueNotes: "I am a note."
    };
    const notes = formatNotes(snoozeOption);
    expect(notes).toEqual([
      {
        content: "I am a note.",
        type: "COMMENT",
        subType: null
      }
    ]);
  });
  it("should create a note with a type but no subType", () => {
    const snoozeOption = {
      snoozeReason: "fo_referral",
      followUp: "ZLA"
    };
    const notes = formatNotes(snoozeOption);
    expect(notes).toEqual([
      {
        content: "ZLA",
        subType: "fieldoffice",
        type: "TAG"
      }
    ]);
  });
  it("should create a note with a type and subType", () => {
    const snoozeOption = {
      snoozeReason: "technical_issue",
      followUp: "12345"
    };
    const notes = formatNotes(snoozeOption);
    expect(notes).toEqual([
      {
        content: "12345",
        subType: "troubleticket",
        type: "LINK"
      }
    ]);
  });
  it("should add both a comment and a follow-up at the same time", () => {
    const snoozeOption = {
      snoozeReason: "technical_issue",
      followUp: "12345",
      caseIssueNotes: "I am a note."
    };
    const notes = formatNotes(snoozeOption);
    expect(notes).toEqual([
      {
        content: "I am a note.",
        subType: null,
        type: "COMMENT"
      },
      {
        content: "12345",
        subType: "troubleticket",
        type: "LINK"
      }
    ]);
  });
});
