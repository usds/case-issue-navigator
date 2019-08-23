import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { UsaCheckbox } from "../../view/util/UsaCheckbox";

storiesOf("UsaCheckbox", module).add("Default checkbox", () => (
  <UsaCheckbox
    id="checkbox-1"
    name="checkbox-1"
    checked={true}
    label="Some checkbox"
    value="my-value"
    onChange={action("checkbox clicked!")}
  />
));
