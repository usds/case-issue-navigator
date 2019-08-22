import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import SnoozeForm from "../controller/SnoozeForm";

storiesOf("SnoozeForm", module).add("Basic snooze form", () => {
  const rowData = {
    previouslySnoozed: false
  };
  const callback = {
    snooze: action("snoozed")
  };
  return <SnoozeForm rowData={rowData} callback={callback} />;
});
