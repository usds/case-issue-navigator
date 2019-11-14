import React from "react";
import { storiesOf } from "@storybook/react";
import I90Table from "../view/tables/I90Table";
import { store } from "../redux/create";
import { casesActionCreators } from "../redux/modules/cases";
import { Provider } from "react-redux";

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
    previouslySnoozed: true,
    notes: [{ type: "comment", subType: "assignee", content: "Phil" }]
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
    },
    snoozeInformation: {
      snoozeEnd: new Date("July 30, 2020"),
      snoozeReason: "technical_issue"
    },
    notes: [
      {
        type: "comment",
        subType: "troubleticket",
        content: "1234",
        href: "http://www.example.com/1234"
      }
    ]
  }
];

storiesOf("I90Table", module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add("Empty Table - Active", () => {
    store.dispatch(casesActionCreators.clearCases());
    store.dispatch(casesActionCreators.setCaseType("active"));
    return <I90Table />;
  })
  .add("Empty Table - Snoozed", () => {
    store.dispatch(casesActionCreators.clearCases());
    store.dispatch(casesActionCreators.setCaseType("snoozed"));
    return <I90Table />;
  })
  .add("Active case view", () => {
    store.dispatch(casesActionCreators.setCaseType("active"));
    store.dispatch(casesActionCreators.setCases(sampleCases));
    return <I90Table />;
  })
  .add("Snoozed case view", () => {
    store.dispatch(casesActionCreators.setCaseType("snoozed"));
    store.dispatch(casesActionCreators.setCases(sampleCases));
    return <I90Table />;
  });
