import React from "react";
import { mount } from "enzyme";
import TriageForm from "../TriageForm";
import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "../config";

describe("SnoozeForm", () => {
  it("should call the snooze callback on submit", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      snoozeInformation: undefined
    };
    const snooze = jest.fn();
    const wrapper = mount(
      <TriageForm
        rowData={rowData}
        snooze={snooze}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    wrapper.find("#SnoozeSumbit").simulate("click");
    expect(snooze).toBeCalledTimes(1);
  });
  it("calls closeDialog on submit", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      snoozeInformation: undefined
    };
    const closeDialog = jest.fn();
    const wrapper = mount(
      <TriageForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={closeDialog}
        caseType="ACTIVE"
      />
    );
    wrapper.find("#SnoozeSumbit").simulate("click");
    expect(closeDialog).toBeCalledTimes(1);
  });
  it("updates reason on dropdown change", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      snoozeInformation: undefined
    };
    const wrapper = mount(
      <TriageForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    const snoozeReason = SNOOZE_OPTIONS_SELECT[1].value;
    (wrapper.find("SnoozeInputs").prop("snoozeReasonChange") as any)(
      snoozeReason
    );
    wrapper.update();
    expect(wrapper.state("snoozeReason") as any).toBe(snoozeReason);
    expect(wrapper.state("duration") as any).toBe(
      SNOOZE_OPTIONS[snoozeReason].duration
    );
  });
  it("updates follow-up reason on change", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      snoozeInformation: undefined
    };
    const wrapper = mount(
      <TriageForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    (wrapper.find("SnoozeInputs").prop("followUpChange") as any)("Some entry");
    expect(wrapper.state("followUp") as any).toBe("Some entry");
  });
  it("updates case issue notes on change", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      snoozeInformation: undefined
    };
    const wrapper = mount(
      <TriageForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    (wrapper.find("SnoozeInputs").prop("caseIssueNotesChange") as any)(
      "Some entry"
    );
    expect(wrapper.state("caseIssueNotes") as any).toBe("Some entry");
  });
  it("updates subreason on change", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      snoozeInformation: {
        snoozeReason: "technical_issue",
        snoozeEnd: "",
        snoozeStart: new Date("01/15/2020").toString(),
        user: { id: "admin", name: "Admin Anna" }
      },
      notes: [
        {
          content: "card_production_error",
          type: "TAG",
          subType: "subreason",
          href: null,
          timestamp: "2020-01-15T17:24:42.42Z",
          user: { id: "admin", name: "Admin Anna" }
        }
      ]
    };
    const wrapper = mount(
      <TriageForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="SNOOZED"
      />
    );
    (wrapper.find("SnoozeInputs").prop("subreasonChange") as any)(
      "undo_referral"
    );
    expect(wrapper.state("subreason") as any).toBe("undo_referral");
  });
});
