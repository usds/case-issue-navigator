import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../../../redux/create";
import { caseFilterActionCreators } from "../../../redux/modules/caseFilters";
import CaseFilterForm from "../CaseFilterForm";
import { CaseAgeFilter } from "../CaseAgeFilter";
import RestAPIClient from "../../../api/RestAPIClient";

describe("CaseFilterForm", () => {
  it("existing cases are cleared on filter submit", () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    store.dispatch(
      caseFilterActionCreators.setCaseCreationStart(new Date("1/1/2018"))
    );
    store.dispatch(
      caseFilterActionCreators.setCaseCreationEnd(new Date("1/1/2019"))
    );
    const wrapper = mount(
      <Provider store={store}>
        <CaseFilterForm />
      </Provider>
    );

    wrapper
      .find(CaseAgeFilter)
      .first()
      .props()
      .onSubmit();
    expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
      "ACTIVE",
      undefined,
      new Date("1/1/2018"),
      new Date("1/1/2019"),
      undefined,
      undefined,
      undefined
    );
    expect(store.getState().cases.caselist.length).toBe(0);
  });
  // it("existing cases are cleared on snooze reason filter submit", () => {
  //   const store = store;
  //   jest.spyOn(RestAPIClient.cases, "getCases");
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <CaseList snoozeState={"snoozed"} />
  //     </Provider>
  //   );
  //   expect(wrapper.find("p").text()).toBe("Loading...");

  //   store.dispatch(casesActionCreators.addCases(initialCases));
  //   store.dispatch(casesActionCreators.setIsLoading(false));
  //   store.dispatch(casesActionCreators.setSnoozeReasonFilter("test_data"));

  //   wrapper.update();

  //   expect(wrapper.find(SnoozeReasonFilter).length).toBe(1);
  //   wrapper
  //     .find(SnoozeReasonFilter)
  //     .first()
  //     .props()
  //     .onUpdate();

  //   expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
  //     "SNOOZED",
  //     undefined,
  //     undefined,
  //     undefined,
  //     "test_data"
  //   );
  //   expect(store.getState().cases.caselist.length).toBe(0);
  // });
});
