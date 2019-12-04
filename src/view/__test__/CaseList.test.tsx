import React from "react";
import { mount } from "enzyme";
import { store } from "../../redux/create";
import { Provider } from "react-redux";
import { casesActionCreators } from "../../redux/modules/cases";
import CaseList from "../CaseList";
import { CaseAgeFilter } from "../forms/CaseAgeFilter";
import RestAPIClient from "../../api/RestAPIClient";

const initialCases: Case[] = [
  {
    receiptNumber: "ABC123",
    caseCreation: "Dec 12, 1984",
    extraData: {
      caseStatus: "",
      caseState: "",
      caseSubstatus: "",
      channelType: "",
      i90SP: true,
      applicationReason: "some reason",
      caseAge: "94 days",
      caseId: "ABC123"
    },
    previouslySnoozed: false,
    showDetails: false
  }
];

describe("CaseList", () => {
  it("gets the cases of the correct type on initalization", () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    mount(
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
  });
  it("existing cases are cleared on filter submit", () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    const wrapper = mount(
      <Provider store={store}>
        <CaseList snoozeState={"active"} />
      </Provider>
    );
    expect(wrapper.find("p").text()).toBe("Loading...");

    store.dispatch(casesActionCreators.addCases(initialCases));
    store.dispatch(casesActionCreators.setIsLoading(false));
    store.dispatch(
      casesActionCreators.setCaseCreationStart(new Date("1/1/2018"))
    );
    store.dispatch(
      casesActionCreators.setCaseCreationEnd(new Date("1/1/2019"))
    );
    wrapper.update();

    expect(wrapper.find(CaseAgeFilter).length).toBe(1);
    wrapper
      .find(CaseAgeFilter)
      .first()
      .props()
      .onSubmit();

    expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
      "ACTIVE",
      undefined,
      new Date("1/1/2018"),
      new Date("1/1/2019")
    );
    expect(store.getState().cases.caselist.length).toBe(0);
  });
});
