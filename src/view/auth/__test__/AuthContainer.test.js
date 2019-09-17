import React from "react";
import { shallow } from "enzyme";
import { AuthContainer } from "../AuthContainer";
import { AuthForm } from "../AuthForm";

const TestComponent = () => <div>Test Component</div>;

describe("AuthContainer", () => {
  it("should render children if logged in", () => {
    const wrapper = shallow(
      <AuthContainer defaultLoggedInState={true}>
        <TestComponent />
      </AuthContainer>
    );
    expect(wrapper.find(TestComponent).length).toBe(1);
    expect(wrapper.find(AuthForm).length).toBe(0);
  });
  it("should render AuthForm if not logged id", () => {
    const wrapper = shallow(
      <AuthContainer defaultLoggedInState={false}>
        <TestComponent />
      </AuthContainer>
    );
    expect(wrapper.find(TestComponent).length).toBe(0);
    expect(wrapper.find(AuthForm).length).toBe(1);
  });
});
