import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import SnoozeForm from "../controller/SnoozeForm";

storiesOf("SnoozeForm", module)
  .add("Basic snooze form", () => {
    const rowData = {
      previouslySnoozed: false
    };
    return (
      <SnoozeForm
        rowData={rowData}
        snooze={action("snooze")}
        closeDialog={action("close")}
        caseType="ACTIVE"
      />
    );
  })
  .add("Basic re-snooze form", () => {
    const addDays = (date, days) => {
      const from = new Date(date.valueOf());
      from.setDate(from.getDate() + days);
      return from;
    };

    const rowData = {
      snoozeInformation: {
        snoozeEnd: addDays(new Date("11/27/2019"), 300).toString(),
        snoozeStart: new Date().toString(),
        snoozeReason: "assigned_case"
      },
      notes: [
        {
          content: "Fran",
          type: "COMMENT",
          subType: "assignee"
        }
      ]
    };

    return (
      <SnoozeForm
        rowData={rowData}
        snooze={action("snooze")}
        closeDialog={action("close")}
        caseType="SNOOZED"
      />
    );
  });
