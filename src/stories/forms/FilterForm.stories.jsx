import React from "react";
import { storiesOf } from "@storybook/react";
import { UnconnectedFilterForm } from "../../view/forms/FilterForm/FilterForm";

storiesOf("FilterForm/Full form", module).add("Basic form", () => (
  <UnconnectedFilterForm />
));
