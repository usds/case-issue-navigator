import React from "react";
import { storiesOf } from "@storybook/react";
import { DesnoozedWarning } from "../../view/notifications/DesnoozedWarning";

storiesOf("DesnoozedWarning", module)
  .add("No desnoozed cases", () => (
    <DesnoozedWarning previouslySnoozedCases={0} />
  ))
  .add("One desnoozed case", () => (
    <DesnoozedWarning previouslySnoozedCases={1} />
  ))
  .add("Multiple desnoozed cases", () => (
    <DesnoozedWarning previouslySnoozedCases={20} />
  ));
