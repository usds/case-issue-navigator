import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ReceiptList from "../view/ReceiptList";

const sampleCases = [
  {
    caseAge: 1660,
    i90SP: "false",
    caseStatus: "Pending",
    caseState: "Happy",
    caseId: "18446",
    caseSubstatus: "Printing",
    channelType: "Pigeon",
    creationDate: "2015-01-07",
    receiptNumber: "FKE5381523",
    applicationReason: "Boredom"
  },
  {
    caseAge: 1647,
    i90SP: "false",
    caseStatus: "Eschewing Obfuscation",
    caseState: "Happy",
    caseId: "96585",
    caseSubstatus: "Amazingly Successful",
    channelType: "Semaphore",
    creationDate: "2015-01-20",
    receiptNumber: "FKE8206743",
    applicationReason: "Boredom"
  },
  {
    caseAge: 1646,
    i90SP: "true",
    caseStatus: "Eschewing Obfuscation",
    caseState: "Despondent",
    caseId: "16433",
    caseSubstatus: "Printing",
    channelType: "Pigeon",
    creationDate: "2015-01-21",
    receiptNumber: "FKE8731511",
    applicationReason: "Enthusiasm"
  }
];

const snoozeOption = {
  follow_up: "Who is the case being assigned to?",
  short_text: "Assigned",
  snooze_days: 5,
  text: "Case has been assigned - remind me later",
  value: "assigned_case"
};

storiesOf("ReceiptList", module)
  .add("Empty Receipt List", () => <ReceiptList cases={[]} />)
  .add("Tabular Cases-to-Work List with some items", () => (
    <ReceiptList
      mode="table"
      cases={sampleCases}
      callback={{
        snoozeUpdate: action("show actions clicked!"),
        details: action("details clicked!")
      }}
    />
  ))
  .add("Tabular Snoozed Case List with some items", () => (
    <ReceiptList
      mode="table"
      view="Snoozed Cases"
      cases={sampleCases.map(sample => ({
        ...sample,
        snooze_option: snoozeOption
      }))}
      callback={{
        snoozeUpdate: action("show actions clicked!"),
        details: action("details clicked!")
      }}
    />
  ));
