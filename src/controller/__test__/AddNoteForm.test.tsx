import React from "react";
import { mount } from "enzyme";
import { AddNoteForm } from "../AddNoteForm";
import RestAPIClient from "../../api/RestAPIClient";

describe("AddNoteForm", () => {
  it("renders an add a note button", () => {
    const rowData: Case = {
      receiptNumber: "",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      showDetails: false,
      snoozeInformation: {
        snoozeStart: new Date().toString(),
        snoozeEnd: new Date().toString(),
        snoozeReason: "technical_issue",
        user: {
          id: "",
          name: ""
        }
      }
    };
    const wrapper = mount(
      <AddNoteForm rowData={rowData} getCaseDetails={() => undefined} />
    );

    expect(wrapper.find("button").text()).toBe("Add Note");
  });

  it("Adding a note preserves snooze data", () => {
    const snoozeEnd = new Date();
    snoozeEnd.setDate(snoozeEnd.getDate() + 1);

    jest.spyOn(RestAPIClient.caseDetails, "addANote");
    const rowData: Case = {
      receiptNumber: "ABC123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      snoozeInformation: {
        snoozeStart: new Date().toString(),
        snoozeEnd: snoozeEnd.toString(),
        snoozeReason: "technical_issue",
        user: {
          id: "",
          name: ""
        }
      }
    };
    const wrapper = mount(
      <AddNoteForm rowData={rowData} getCaseDetails={() => undefined} />
    );

    // Open modal
    wrapper
      .find("#caseIssueNotes")
      .at(0)
      .simulate("change", { target: { value: "I am a note." } });
    wrapper.find("button").simulate("click", {});
    expect(RestAPIClient.caseDetails.addANote).toHaveBeenCalledWith(
      "ABC123",

      {
        content: "I am a note.",
        subType: null,
        type: "COMMENT"
      }
    );
  });
});
