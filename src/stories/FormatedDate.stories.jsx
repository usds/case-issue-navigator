import React from "react";
import { storiesOf } from "@storybook/react";
import FormattedDate from "../view/util/FormattedDate";

storiesOf("FormattedDate", module).add("Last Refresh", () => (
  <FormattedDate label="Last Refresh" date={new Date("2014-08-11T00:00:00")} />
));
