import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../../redux/create";
import CaseList from "../CaseList";
import RestAPIClient from "../../api/RestAPIClient";

describe("CaseList", () => {
  it("lodaing when there are no cases", () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    const wrapper = mount(
      <Provider store={store}>
        <CaseList/>
      </Provider>
    );
    expect(wrapper.find("p").text()).toBe("Loading...");
  });
});
