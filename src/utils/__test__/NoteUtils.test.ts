import React from "react";
import NoteUtils from "../NoteUtils";



describe("NoteUtils", () => {
  it("no notes returns null", () => {
    expect(NoteUtils.getAssignee([])).toBeNull();
  });

  it("no assignee note returns null", () => {
    const assignee: DBNote = {
      content: "123",
      href: "http://tickets.example.com/ticket/123/details",
      subType: "troubleticket",
      timestamp: "2019-10-18T14:23:27.887+0000",
      type: "LINK",
      userId: "42b78e9e-408c-4e32-8fbc-dc4b70ae3718"
    }
    expect(NoteUtils.getAssignee([])).toBeNull();
  });

  it("finds an assignee", () => {
    const assignee: DBNote = {
      content: "Emma",
      href: null,
      subType: "assignee",
      timestamp: "2019-10-18T14:23:27.887+0000",
      type: "TAG",
      userId: "28f247e4-a022-454e-acc5-b287aa679b59"
    }
    expect(NoteUtils.getAssignee([assignee])).toBe("Emma");
  });


  it("finds the correct assignee", () => {
    const assignee: DBNote = {
      content: "Emma",
      href: null,
      subType: "assignee",
      timestamp: "2019-10-17T14:23:27.887+0000",
      type: "TAG",
      userId: "28f247e4-a022-454e-acc5-b287aa679b59"
    }
    const UpdatedAssignee: DBNote = {
      content: "Eric",
      href: null,
      subType: "assignee",
      timestamp: "2019-10-18T14:23:27.887+0000",
      type: "TAG",
      userId: "28f247e4-a022-454e-acc5-b287aa679b59"
    }
    expect(NoteUtils.getAssignee([UpdatedAssignee, assignee])).toBe("Eric");
  });
});
