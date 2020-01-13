import { formatNotes } from "../formatNotes";

describe("formatNotes", () => {
  it("should return an empty notes array for no snoozeOption", () => {
    const snoozeOption: CallbackState = {
      snoozeReason: "test_data",
      subreason: "",
      followUp: "",
      caseIssueNotes: "",
      duration: 0
    };
    const notes = formatNotes(snoozeOption);
    expect(notes).toEqual([]);
  });
  it("should create a basic comment note", () => {
    const snoozeOption: CallbackState = {
      snoozeReason: "test_data",
      subreason: "",
      followUp: "",
      caseIssueNotes: "I am a note.",
      duration: 0
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
  it("should create a note with a type and subType", () => {
    const snoozeOption: CallbackState = {
      snoozeReason: "technical_issue",
      subreason: "",
      followUp: "12345",
      caseIssueNotes: "",
      duration: 0
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
    const snoozeOption: CallbackState = {
      snoozeReason: "technical_issue",
      subreason: "",
      followUp: "12345",
      caseIssueNotes: "I am a note.",
      duration: 0
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
  it("should add both a comment and a follow-up at the same time", () => {
    const snoozeOption: CallbackState = {
      snoozeReason: "technical_issue",
      subreason: "",
      followUp: "12345",
      caseIssueNotes: "I am a note.",
      duration: 0
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
