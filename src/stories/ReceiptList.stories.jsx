import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ReceiptList from "../view/tables/ReceiptList";

const sampleCases = [
  {
    receiptNumber: "FKE5381523",
    caseCreation: new Date().setDate(new Date().getDate() - 100),
    extraData: {
      caseStatus: "Pending",
      caseState: "Happy",
      caseSubstatus: "Printing",
      channelType: "Pigeon",
      i90SP: "false",
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
      i90SP: "true",
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

const headers = [
  { key: "showDetails", props: { toggleDetails: action("details clicked!") } },
  { key: "receiptNumber" },
  { key: "applicationReason" },
  { key: "caseStatus" },
  { key: "caseSubstatus" },
  { key: "platform" },
  { key: "assigned" },
  {
    key: "actions",
    props: {
      updateSummaryData: () => undefined,
      setError: () => undefined,
      setNotification: () => undefined,
      removeCase: action("show actions clicked!")
    }
  }
];

const snoozedHeaders = [
  { key: "showDetails", props: { toggleDetails: action("details clicked!") } },
  { key: "receiptNumber" },
  { key: "applicationReason" },
  { key: "platform" },
  { key: "problem" },
  { key: "snoozed" },
  { key: "assigned" },
  { key: "SNTicket" },
  {
    key: "snoozeActions",
    props: {
      updateSummaryData: () => undefined,
      setError: () => undefined,
      setNotification: () => undefined,
      onSnoozeUpdate: () => undefined,
      removeCase: () => undefined
    }
  }
];

storiesOf("ReceiptList", module)
  .add("Empty Receipt List", () => (
    <ReceiptList cases={[]} headers={headers} isLoading={false} />
  ))
  .add("Tabular Cases-to-Work List with some items", () => (
    <ReceiptList cases={sampleCases} headers={headers} isLoading={false} />
  ))
  .add("Tabular Snoozed Case List with some items", () => (
    <ReceiptList
      cases={sampleCases.map(sample => ({
        ...sample,
        snoozeInformation
      }))}
      headers={snoozedHeaders}
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
        i90SP: "true",
        applicationReason: "Enthusiasm"
      }
    });

    return (
      <ReceiptList
        cases={modifiedSampleCases.map(sample => ({
          ...sample,
          snoozeInformation
        }))}
        headers={snoozedHeaders}
        isLoading={false}
      />
    );
  })
  .add("Tabular Cases-to-Work List with some items; boolean SP", () => {
    const modifiedSampleCases = sampleCases.map((sampleCase, i) => {
      return {
        ...sampleCase,
        extraData: { ...sampleCases.extraData, i90SP: i % 2 === 1 }
      };
    });

    return (
      <ReceiptList
        cases={modifiedSampleCases}
        headers={headers}
        isLoading={false}
      />
    );
  });
