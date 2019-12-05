import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../../redux/create";
import CaseList from "../CaseList";
import RestAPIClient from "../../api/RestAPIClient";

describe("CaseList", () => {
  it("gets the cases of the correct type on initalization", () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    const wrapper = mount(
      <Provider store={store}>
        <CaseList snoozeState={"active"} />
      </Provider>
    );
    expect(store.getState().cases.type).toBe("active");
    expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
      "ACTIVE",
      undefined,
      undefined,
      undefined
    );
    expect(wrapper.find("p").text()).toBe("Loading...");
  });
});
