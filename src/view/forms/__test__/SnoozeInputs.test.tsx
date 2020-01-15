import React from "react";
import { mount } from "enzyme";
import SnoozeInputs from "../SnoozeInputs";
import { SNOOZE_OPTIONS_SELECT } from "../../../controller/config";

describe("SnoozeInputs", () => {
  it("renders with required snooze option select values", () => {
    const wrapper = mount(
      <SnoozeInputs
        options={SNOOZE_OPTIONS_SELECT}
        selectedOption={{
          snoozeReason: "",
          duration: 1,
          shortText: "",
          type: null,
          subType: null,
          value: "in_proceedings"
        }}
        snoozeReasonChange={jest.fn()}
        followUpChange={jest.fn()}
        subreasonChange={jest.fn()}
        caseIssueNotesChange={jest.fn()}
        durationChange={jest.fn()}
        setError={jest.fn()}
        deleteError={jest.fn()}
        duration={SNOOZE_OPTIONS_SELECT[0].duration}
        followUp=""
        subreason=""
        caseIssueNotes=""
      />
    );
    SNOOZE_OPTIONS_SELECT.forEach(option => {
      expect(wrapper.find(`option[value="${option.value}"]`).length).toBe(1);
    });
  });

  it("updates reason on dropdown change", () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SnoozeInputs
        options={SNOOZE_OPTIONS_SELECT}
        selectedOption={{
          snoozeReason: "",
          duration: 1,
          shortText: "",
          type: null,
          subType: null,
          value: "in_proceedings"
        }}
        snoozeReasonChange={spy}
        followUpChange={jest.fn()}
        subreasonChange={jest.fn()}
        caseIssueNotesChange={jest.fn()}
        durationChange={jest.fn()}
        setError={jest.fn()}
        deleteError={jest.fn()}
        duration={SNOOZE_OPTIONS_SELECT[0].duration}
        followUp=""
        subreason=""
        caseIssueNotes=""
      />
    );
    wrapper.find("select").simulate("change", {
      target: { value: "selectedValue" }
    });
    expect(spy).toBeCalledWith("selectedValue");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("updates follow-up reason on change", () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SnoozeInputs
        options={SNOOZE_OPTIONS_SELECT}
        selectedOption={{
          snoozeReason: "",
          duration: 1,
          shortText: "",
          type: null,
          subType: null,
          value: "in_proceedings",
          followUp: "true"
        }}
        snoozeReasonChange={jest.fn()}
        followUpChange={spy}
        subreasonChange={jest.fn()}
        caseIssueNotesChange={jest.fn()}
        durationChange={jest.fn()}
        setError={jest.fn()}
        deleteError={jest.fn()}
        duration={SNOOZE_OPTIONS_SELECT[0].duration}
        followUp=""
        subreason=""
        caseIssueNotes=""
      />
    );

    wrapper.find("#followUp").simulate("change", {
      target: {
        value: "Some entry"
      }
    });
    expect(spy).toBeCalledWith("Some entry");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("updates case issue notes on change", () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SnoozeInputs
        options={SNOOZE_OPTIONS_SELECT}
        selectedOption={{
          snoozeReason: "",
          duration: 1,
          shortText: "",
          type: null,
          subType: null,
          value: "in_proceedings"
        }}
        snoozeReasonChange={jest.fn()}
        followUpChange={jest.fn()}
        subreasonChange={jest.fn()}
        caseIssueNotesChange={spy}
        durationChange={jest.fn()}
        setError={jest.fn()}
        deleteError={jest.fn()}
        duration={SNOOZE_OPTIONS_SELECT[0].duration}
        followUp=""
        subreason=""
        caseIssueNotes=""
      />
    );

    (wrapper.find("AddNoteInput").prop("onChange") as any)("Some entry");
    expect(spy).toBeCalledWith("Some entry");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("updates subreason on change", () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SnoozeInputs
        options={SNOOZE_OPTIONS_SELECT}
        selectedOption={{
          snoozeReason: "",
          duration: 1,
          shortText: "",
          type: null,
          subType: null,
          value: "technical_issue"
        }}
        snoozeReasonChange={jest.fn()}
        followUpChange={jest.fn()}
        subreasonChange={spy}
        caseIssueNotesChange={jest.fn()}
        durationChange={jest.fn()}
        setError={jest.fn()}
        deleteError={jest.fn()}
        duration={SNOOZE_OPTIONS_SELECT[0].duration}
        followUp=""
        subreason=""
        caseIssueNotes=""
      />
    );

    wrapper.find("#technicalSubtype").simulate("change", {
      target: {
        value: "undo_referral"
      }
    });
    expect(spy).toBeCalledWith("undo_referral");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
