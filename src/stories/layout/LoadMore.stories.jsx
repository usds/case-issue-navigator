import React from "react";
import { storiesOf } from "@storybook/react";
import LoadMore from "../../view/layout/LoadMore";

storiesOf("LoadMore", module)
  .add("no cases", () => (
    <LoadMore
      totalCases={0}
      loadedCases={0}
      isLoading={false}
      onClick={() => undefined}
    />
  ))
  .add("no more cases", () => (
    <LoadMore
      totalCases={14000}
      loadedCases={14000}
      isLoading={false}
      onClick={() => undefined}
    />
  ))
  .add("more cases", () => (
    <LoadMore
      totalCases={14000}
      loadedCases={20}
      isLoading={false}
      onClick={() => undefined}
    />
  ))
  .add("more cases loading", () => (
    <LoadMore
      totalCases={14000}
      loadedCases={20}
      isLoading={true}
      onClick={() => undefined}
    />
  ));
