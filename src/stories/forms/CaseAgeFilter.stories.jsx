import React from "react";
import { storiesOf } from "@storybook/react";
import { CaseAgeFilter } from "../../view/forms/CaseAgeFilter";

storiesOf("CaseAgeFilter", module).add("Empty case list", () => (
  <CaseAgeFilter
    caselist={[
      {
        caseCreation: "1/1/2014",
      }
    ]}
    end={new Date("12/4/2019")}
    onStartChange={() => undefined}
    onEndChange={() => undefined}
    onSubmit={() => undefined}
  />
));
