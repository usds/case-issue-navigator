import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ReceiptList from "../view/ReceiptList";
import { VIEWS } from "../controller/config";

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

const tomorrow = new Date().setDate(new Date().getDate() + 1);

const snoozeInformation = {
  snoozeEnd: tomorrow,
  snoozeReason: "Just Because",
  snoozeDetails: null,
  snoozeStart: "2019-08-05T18:33:08.063408-04:00"
};

storiesOf("ReceiptList", module)
  .add("Empty Receipt List", () => <ReceiptList cases={[]} />)
  .add("Tabular Cases-to-Work List with some items", () => (
    <ReceiptList
      view={VIEWS.CASES_TO_WORK.TITLE}
      cases={sampleCases}
      callback={{
        snoozeUpdate: action("show actions clicked!"),
        details: action("details clicked!")
      }}
    />
  ))
  .add("Tabular Snoozed Case List with some items", () => (
    <ReceiptList
      view={VIEWS.SNOOZED_CASES.TITLE}
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
