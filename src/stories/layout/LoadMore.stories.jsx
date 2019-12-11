import React from "react";
import { storiesOf } from "@storybook/react";
import LoadMore from "../../view/layout/LoadMore";

const onClick = () => undefined;

storiesOf("LoadMore", module)
  .add("no more cases", () => (
    <LoadMore hasMoreCases={false} isLoading={false} onClick={onClick} />
  ))
  .add("more cases", () => (
    <LoadMore hasMoreCases={true} isLoading={false} onClick={onClick} />
  ))
  .add("more cases loading", () => (
    <LoadMore hasMoreCases={true} isLoading={true} onClick={onClick} />
  ));
