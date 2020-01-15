import React from "react";
import { mount } from "enzyme";
import AddNoteInput from "../AddNoteInput";

describe("AddNoteInput", () => {
  it("updates case issue notes on change", () => {
    const spy = jest.fn();
    const wrapper = mount(
      <AddNoteInput onChange={spy} value="" defaultShow={false} />
    );

    wrapper.find("#showNoteField").simulate("click");
    wrapper.find("#caseIssueNotes").simulate("change", {
      target: {
        value: "Some entry"
      }
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith("Some entry");
  });
});
