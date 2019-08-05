import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ReceiptList from "../view/ReceiptList";

const sampleCases = [
  {
    receiptNumber: "FKE5381523",
    caseCreation: "2015-05-01T19:00:00-00:00",
    extraData: {
      caseStatus: "Pending",
      caseState: "Happy",
      caseSubstatus: "Printing",
      channelType: "Pigeon",
      streamlinedProcess: false,
      applicationReason: "Boredom"
    }
  },
  {
    receiptNumber: "FKE8206743",
    caseCreation: "2015-05-20T19:00:00-00:00",
    extraData: {
      extraData: {
        caseStatus: "Eschewing Obfuscation",
        caseState: "Happy",
        caseSubstatus: "Amazingly Successful",
        channelType: "Semaphore",
        streamlinedProcess: true,
        applicationReason: "Enthusiasm"
      }
    }
  }
];

const snoozeInformation = {
  snoozeEnd: "2019-08-07T03:00:00-04:00",
  snoozeReason: "Just Because",
  snoozeDetails: null,
  snoozeStart: "2019-08-05T18:33:08.063408-04:00"
};

storiesOf("ReceiptList", module)
  .add("Empty Receipt List", () => <ReceiptList cases={[]} />)
  .add("Tabular Cases-to-Work List with some items", () => (
    <ReceiptList
      view="Cases to work"
      cases={sampleCases}
      callback={{
        snoozeUpdate: action("show actions clicked!"),
        details: action("details clicked!")
      }}
    />
  ))
  .add("Tabular Snoozed Case List with some items", () => (
    <ReceiptList
      view="Snoozed Cases"
      cases={sampleCases.map(sample => ({
        ...sample,
        snoozeInformation
      }))}
      callback={{
        snoozeUpdate: action("show actions clicked!"),
        details: action("details clicked!")
      }}
    />
  ));
