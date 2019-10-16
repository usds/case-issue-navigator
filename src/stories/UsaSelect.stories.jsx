import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import UsaSelect from "../view/forms/UsaSelect";

storiesOf("UsaSelect", module).add("Select", () => (
  <UsaSelect
    onChange={action()}
    name="name"
    selected="X"
    placeholder="placeholder"
    options={[
        {value: "X", text:"x"},
        {value: "Y", text:"y"},
        {value: "Z", text:"z"},
    ]}
  />
));
