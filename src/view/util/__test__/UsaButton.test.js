import React from "react";
import { mount } from "enzyme";
import UsaButton from "../UsaButton";

describe("UsaButton", () => {
  it("should render a basic button", () => {
    const wrapper = mount(<UsaButton>Click Me</UsaButton>);
    expect(
      wrapper.containsMatchingElement(
        <button className="usa-button" type="button">
          Click Me
        </button>
      )
    ).toBe(true);
  });
  it("should render a button with specified buttonStyle", () => {
    const wrapper = mount(
      <UsaButton buttonStyle="secondary">Click Me</UsaButton>
    );
    expect(
      wrapper.containsMatchingElement(
        <button className="usa-button usa-button--secondary" type="button">
          Click Me
        </button>
      )
    ).toBe(true);
  });
  it("should render a button with specified disabled attribute", () => {
    const wrapper = mount(<UsaButton disabled={true}>Click Me</UsaButton>);
    expect(
      wrapper.containsMatchingElement(
        <button className="usa-button" type="button" disabled>
          Click Me
        </button>
      )
    ).toBe(true);
  });
  it("should execute a function when clicked", () => {
    const myFunc = jest.fn();
    const wrapper = mount(<UsaButton onClick={myFunc}>Click Me</UsaButton>);
    wrapper.simulate("click");
    expect(myFunc).toHaveBeenCalledTimes(1);
  });
});
