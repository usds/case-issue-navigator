import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { VIEWS, I90_HEADERS } from "../controller/config";
import ReceiptList from "../view/tables/ReceiptList";
import { getHeaders } from "../view/util/getHeaders";

const sampleCases = [
  {
    receiptNumber: "FKE5381523",
    caseCreation: new Date().setDate(new Date().getDate() - 100),
    extraData: {
      caseStatus: "Pending",
      caseState: "Happy",
      caseSubstatus: "Printing",
      channelType: "Pigeon",
      streamlinedProcess: false,
      applicationReason: "Boredom"
    },
    previouslySnoozed: true
  },
  {
    receiptNumber: "FKE8206743",
    caseCreation: new Date().setDate(new Date().getDate() - 150),
    extraData: {
      caseStatus: "Eschewing Obfuscation",
      caseState: "Happy",
      caseSubstatus: "Amazingly Successful",
      channelType: "Semaphore",
      streamlinedProcess: true,
      applicationReason: "Enthusiasm"
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

const modifiedHeaders = I90_HEADERS.filter(
  header => header.field !== "caseCreation"
);

storiesOf("ReceiptList", module)
  .add("Empty Receipt List", () => (
    <ReceiptList
      cases={[]}
      headers={getHeaders(modifiedHeaders, VIEWS.CASES_TO_WORK.TITLE)}
      callback={{
        snoozeUpdate: action("show actions clicked!"),
        details: action("details clicked!")
      }}
      isLoading={false}
    />
  ))
  .add("Tabular Cases-to-Work List with some items", () => (
    <ReceiptList
      view={VIEWS.CASES_TO_WORK.TITLE}
      cases={sampleCases}
      callback={{
        snoozeUpdate: action("show actions clicked!"),
        details: action("details clicked!")
      }}
      headers={getHeaders(modifiedHeaders, VIEWS.CASES_TO_WORK.TITLE)}
      isLoading={false}
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
      headers={getHeaders(modifiedHeaders, VIEWS.SNOOZED_CASES.TITLE)}
      isLoading={false}
    />
  ))
  .add("Snoozed Case List with an open details accordion", () => {
    const modifiedSampleCases = [...sampleCases];
    modifiedSampleCases.push({
      showDetails: true,
      notes: [
        {
          subType: "troubleticket",
          content: "12345",
          href: "http://localhost:1111/12345",
          timestamp: new Date("July 11, 2019")
        },
        {
          content: "Here's another note",
          timestamp: new Date("June 11, 2019")
        }
      ],
      receiptNumber: "FKE123123",
      caseCreation: new Date().setDate(new Date().getDate() - 150),
      extraData: {
        caseStatus: "Eschewing Obfuscation",
        caseState: "Happy",
        caseSubstatus: "Amazingly Successful",
        channelType: "Semaphore",
        streamlinedProcess: true,
        applicationReason: "Enthusiasm"
      }
    });

    return (
      <ReceiptList
        view={VIEWS.SNOOZED_CASES.TITLE}
        cases={modifiedSampleCases.map(sample => ({
          ...sample,
          snoozeInformation
        }))}
        callback={{
          snoozeUpdate: action("show actions clicked!"),
          details: action("details clicked!")
        }}
        headers={getHeaders(modifiedHeaders, VIEWS.SNOOZED_CASES.TITLE)}
        isLoading={false}
      />
    );
  });
