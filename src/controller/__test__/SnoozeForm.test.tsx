import React from "react";
import { mount } from "enzyme";
import SnoozeForm from "../SnoozeForm";
import { SNOOZE_OPTIONS_SELECT } from "../config";

describe("SnoozeForm", () => {
  it("renders a snooze form with required snooze option select values", () => {
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
    SNOOZE_OPTIONS_SELECT.forEach(option => {
      expect(wrapper.find(`option[value="${option.value}"]`).length).toBe(1);
    });
  });
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
    const spy = jest.spyOn(SnoozeForm.prototype, "snoozeReasonChange");
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    wrapper.find("select").simulate("change", {
      target: { value: SNOOZE_OPTIONS_SELECT[1].value }
    });
    expect(spy).toHaveBeenCalledTimes(1);
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
    const spy = jest.spyOn(SnoozeForm.prototype, "followUpChange");
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="ACTIVE"
      />
    );
    wrapper.find("select").simulate("change", {
      target: {
        value: (SNOOZE_OPTIONS_SELECT.find(
          option => option.followUp
        ) as SnoozeOptionValue).value
      }
    });
    wrapper.find("#followUp").simulate("change", {
      target: {
        value: "Some entry"
      }
    });
    expect(spy).toHaveBeenCalledTimes(1);
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
    wrapper.find("select").simulate("change", {
      target: {
        value: SNOOZE_OPTIONS_SELECT[1].value
      }
    });
    wrapper.find("#showNoteField").simulate("click");
    wrapper.find("#caseIssueNotes").simulate("change", {
      target: {
        value: "Some entry"
      }
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
