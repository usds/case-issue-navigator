import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import UsaButton from "../view/util/UsaButton";

storiesOf("UsaButton", module).add("Secondary button", () => (
  <UsaButton buttonStyle="secondary" onClick={action("clicked!")}>
    Submit
  </UsaButton>
));
