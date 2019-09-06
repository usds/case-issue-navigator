import React from "react";
import { mount } from "enzyme";
import UsaTextInput from "../UsaTextInput";

describe("UsaTextInput", () => {
  it("should render an input without a label", () => {
    const wrapper = mount(<UsaTextInput name="myInput" />);
    expect(wrapper.exists("input")).toBe(true);
    expect(wrapper.exists("label")).toBe(false);
  });
  it("should render an input with a label", () => {
    const wrapper = mount(
      <UsaTextInput name="myInput">Some label</UsaTextInput>
    );
    expect(wrapper.exists("input")).toBe(true);
    expect(wrapper.exists("label")).toBe(true);
  });
  it("should call onchange when changed", () => {
    const onChange = jest.fn();
    const event = { target: { name: "myInput", value: "some input" } };
    const wrapper = mount(
      <UsaTextInput name="myInput" onChange={onChange}>
        Some label
      </UsaTextInput>
    );
    wrapper.find("#myInput").simulate("change", event);
    expect(onChange).toHaveBeenCalled();
  });
});
