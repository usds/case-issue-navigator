import React from "react";
import { mount } from "enzyme";
import AuthContainer from "../AuthContainer";
import { AuthForm } from "../AuthForm";
import { store } from "../../../redux/create";
import { Provider } from "react-redux";
import { appStatusActionCreators } from "../../../redux/modules/appStatus";

const TestComponent = () => <div>Test Component</div>;

describe("AuthContainer", () => {
  beforeEach(() => {
    store.dispatch(appStatusActionCreators.clearUser());
  });
  it("should render children if logged in", () => {
    store.dispatch(appStatusActionCreators.setUser("Bob"));
    const wrapper = mount(
      <Provider store={store}>
        <AuthContainer defaultLoggedInState={true}>
          <TestComponent />
        </AuthContainer>
      </Provider>
    );
    expect(wrapper.find(TestComponent).length).toBe(1);
    expect(wrapper.find(AuthForm).length).toBe(0);
  });
  it("should render AuthForm if not logged in", () => {
    const wrapper = mount(
      <Provider store={store}>
        <AuthContainer defaultLoggedInState={true}>
          <TestComponent />
        </AuthContainer>
      </Provider>
    );
    expect(wrapper.find(TestComponent).length).toBe(0);
    expect(wrapper.find(AuthForm).length).toBe(1);
  });
});
