import React from "react";
import { storiesOf } from "@storybook/react";
import { OverdueCasesWarning } from "../../view/notifications/OverdueCasesWarning";

storiesOf("OverdueCasesWarning", module)
  .add("No desnoozed cases", () => (
    <OverdueCasesWarning overdueCases={0} snoozeState="ACTIVE" />
  ))
  .add("One desnoozed case", () => (
    <OverdueCasesWarning overdueCases={1} snoozeState="ACTIVE" />
  ))
  .add("Multiple desnoozed cases", () => (
    <OverdueCasesWarning overdueCases={20} snoozeState="ACTIVE" />
  ));
