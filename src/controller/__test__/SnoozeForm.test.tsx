import React from "react";
import { mount } from "enzyme";
import SnoozeForm from "../SnoozeForm";
import { SNOOZE_OPTIONS_SELECT } from "../config";

const rowData = {
  receiptNumber: "FAK123"
} as Case;

describe("SnoozeForm", () => {
  it("should render a snooze form with required snooze option select values", () => {
    const callbacks = {
      closeDialog: jest.fn(),
      snooze: jest.fn()
    };
    const wrapper = mount(
      <SnoozeForm rowData={rowData} callback={callbacks} />
    );
    SNOOZE_OPTIONS_SELECT.forEach(option => {
      expect(wrapper.find(`option[value="${option.value}"]`).length).toBe(1);
    });
  });
  it("should call the snooze callback on submit", () => {
    const callbacks = {
      closeDialog: jest.fn(),
      snooze: jest.fn()
    };
    const wrapper = mount(
      <SnoozeForm rowData={rowData} callback={callbacks} />
    );
    wrapper.find(".usa-button").simulate("click");
    expect(callbacks.snooze).toBeCalledTimes(1);
  });
  it("should call the closeDialog callback on submit", () => {
    const callbacks = {
      closeDialog: jest.fn(),
      snooze: jest.fn()
    };
    const wrapper = mount(
      <SnoozeForm rowData={rowData} callback={callbacks} />
    );
    wrapper.find(".usa-button").simulate("click");
    expect(callbacks.closeDialog).toBeCalledTimes(1);
  });
  it("should handle snooze reason dropdown changes", () => {
    const callbacks = {
      closeDialog: jest.fn(),
      snooze: jest.fn()
    };
    const spy = jest.spyOn(SnoozeForm.prototype, "snoozeReasonChange");
    const wrapper = mount(
      <SnoozeForm rowData={rowData} callback={callbacks} />
    );
    wrapper.find("select").simulate("change", {
      target: { value: SNOOZE_OPTIONS_SELECT[1].value }
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("should handle follow-up reason changes", () => {
    const callbacks = {
      closeDialog: jest.fn(),
      snooze: jest.fn()
    };
    const spy = jest.spyOn(SnoozeForm.prototype, "followUpChange");
    const wrapper = mount(
      <SnoozeForm rowData={rowData} callback={callbacks} />
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
  it("should handle case issue notes changes", () => {
    const callbacks = {
      closeDialog: jest.fn(),
      snooze: jest.fn()
    };
    const spy = jest.spyOn(SnoozeForm.prototype, "caseIssueNotesChange");
    const wrapper = mount(
      <SnoozeForm rowData={rowData} callback={callbacks} />
    );
    wrapper.find("select").simulate("change", {
      target: {
        value: SNOOZE_OPTIONS_SELECT[1].value
      }
    });
    wrapper.find("#caseIssueNotes").simulate("change", {
      target: {
        value: "Some entry"
      }
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
