import React from "react";
import { storiesOf } from "@storybook/react";
import { UnconnectedFilterForm } from "../../view/forms/FilterForm";

storiesOf("FilterForm", module).add("Basic form", () => (
  <UnconnectedFilterForm />
));
