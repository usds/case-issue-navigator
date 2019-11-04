import React from "react";
import { mount } from "enzyme";
import FormattedDate from "../FormattedDate";

describe("FormattedDate", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => null);
  });
  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });
  it("should return null when a date is missing", () => {
    const wrapper = mount(<FormattedDate label="a" />);
    expect(wrapper.html()).toBe(null);
  });

  it("should return null when a date is invalid", () => {
    const wrapper = mount(
      <FormattedDate label="a" date="Invalid date string" />
    );
    expect(wrapper.html()).toBe(null);
  });

  it("should return a labeled date", () => {
    const wrapper = mount(<FormattedDate label="a" date="October 10, 2019" />);
    expect(wrapper.html()).toBe("<p>a: 10/10/2019, 12:00:00 AM</p>");
  });
});
