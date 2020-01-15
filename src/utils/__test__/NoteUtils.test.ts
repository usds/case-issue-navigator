import NoteUtils from "../NoteUtils";

describe("NoteUtils", () => {
  it("no notes returns null", () => {
    expect(NoteUtils.getFollowUp([], "fieldoffice")).toBeNull();
  });

  it("no fieldoffice note returns null", () => {
    const fieldoffice: Note = {
      content: "123",
      href: "http://tickets.example.com/ticket/123/details",
      subType: "troubleticket",
      timestamp: "2019-10-18T14:23:27.887+0000",
      type: "LINK",
      userId: "42b78e9e-408c-4e32-8fbc-dc4b70ae3718"
    };
    expect(NoteUtils.getFollowUp([fieldoffice], "fieldoffice")).toBeNull();
  });

  it("finds an fieldoffice", () => {
    const fieldoffice: Note = {
      content: "Emma",
      href: null,
      subType: "fieldoffice",
      timestamp: "2019-10-18T14:23:27.887+0000",
      type: "TAG",
      userId: "28f247e4-a022-454e-acc5-b287aa679b59"
    };
    expect(
      (NoteUtils.getFollowUp([fieldoffice], "fieldoffice") as any).content
    ).toBe("Emma");
  });

  it("finds the correct fieldoffice", () => {
    const fieldoffice: Note = {
      content: "Emma",
      href: null,
      subType: "fieldoffice",
      timestamp: "2019-10-17T14:23:27.887+0000",
      type: "TAG",
      userId: "28f247e4-a022-454e-acc5-b287aa679b59"
    };
    const Updatedfieldoffice: Note = {
      content: "Eric",
      href: null,
      subType: "fieldoffice",
      timestamp: "2019-10-18T14:23:27.887+0000",
      type: "TAG",
      userId: "28f247e4-a022-454e-acc5-b287aa679b59"
    };
    expect(
      (NoteUtils.getFollowUp(
        [fieldoffice, Updatedfieldoffice],
        "fieldoffice"
      ) as any).content
    ).toBe("Eric");
  });
});
