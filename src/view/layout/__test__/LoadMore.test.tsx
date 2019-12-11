import React from "react";
import { shallow } from "enzyme";
import LoadMore from "../LoadMore";

describe("LoadMore", () => {
  it("should be disabled when loading more cases", () => {
    const wrapper = shallow(
      <LoadMore
        hasMoreCases={true}
        isLoading={true}
        onClick={() => undefined}
      />
    );
    expect(wrapper.find("UsaButton").prop("disabled")).toBe(true);
  });
});
