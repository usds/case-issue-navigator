import React from "react";
import { mount } from "enzyme";
import { ActionModal } from "../ActionModal";

const closeModal = jest.fn();

describe("ActionModal", () => {
  it("should render a basic modal", () => {
    const wrapper = mount(
      <ActionModal isOpen={true} title="Hello" closeModal={closeModal}>
        <p>This is a modal</p>
      </ActionModal>
    );
    expect(wrapper.containsMatchingElement(<p>This is a modal</p>)).toBe(true);
  });
  it("should render nothing when isOpen is false", () => {
    const wrapper = mount(
      <ActionModal isOpen={false} title="Hello" closeModal={closeModal}>
        <p>This is a modal</p>
      </ActionModal>
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
