import React from "react";
import { mount } from "enzyme";
import SnoozeForm from "../SnoozeForm";
import { SNOOZE_OPTIONS_SELECT, SNOOZE_OPTIONS } from "../config";

describe("SnoozeForm", () => {
  it("calls snooze on submit", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      showDetails: false,
      snoozeInformation: undefined
    };
    const snooze = jest.fn();
    const wrapper = mount(
      <SnoozeForm
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
      showDetails: false,
      snoozeInformation: undefined
    };
    const closeDialog = jest.fn();
    const wrapper = mount(
      <SnoozeForm
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
      showDetails: false,
      snoozeInformation: undefined
    };
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    const snoozeReason = SNOOZE_OPTIONS_SELECT[1].value;
    (wrapper.find("SnoozeInputs").prop("snoozeReasonChange") as any)(snoozeReason)
    wrapper.update();
    expect((wrapper.state('snoozeReason') as any)).toBe(snoozeReason);
    expect((wrapper.state('duration') as any)).toBe(SNOOZE_OPTIONS[snoozeReason].duration);
  });
  it("updates follow-up reason on change", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      showDetails: false,
      snoozeInformation: undefined
    };
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    (wrapper.find("SnoozeInputs").prop("followUpChange") as any)("Some entry")
    expect((wrapper.state('followUp') as any)).toBe("Some entry");
  });
  it("updates case issue notes on change", () => {
    const rowData: Case = {
      receiptNumber: "FAK123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      showDetails: false,
      snoozeInformation: undefined
    };
    const spy = jest.spyOn(SnoozeForm.prototype, "caseIssueNotesChange");
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    (wrapper.find("SnoozeInputs").prop("caseIssueNotesChange") as any)("Some entry")
    expect((wrapper.state('caseIssueNotes') as any)).toBe("Some entry");
  });
});
