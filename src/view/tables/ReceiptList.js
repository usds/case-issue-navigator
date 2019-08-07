import React from "react";
import { VIEWS } from "../../controller/config";
import { buttonizer } from "../util/buttonizer";
import { TabularList } from "./TabularList";

const i90_headers = [
  {
    header: "Receipt Number",
    field: "receiptNumber",
    content: "LINK",
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Case Age",
    field: "caseCreation",
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE],
    content: d => {
      const days = Math.ceil((new Date() - new Date(d)) / 86400000);
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    }
  },
  {
    header: "Case Creation",
    field: "caseCreation",
    content: "DATE",
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Case Status",
    field: "extraData",
    content: field => field.caseStatus,
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Case Substatus",
    field: "extraData",
    content: field => field.caseSubstatus,
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Platform",
    field: "extraData",
    content: d => (d.streamlinedProcess === "true" ? "SP" : "Legacy"),
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Problem",
    field: "snoozeInformation",
    content: field => field.snoozeReason,
    views: [VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Snoozed",
    field: "snoozeInformation",
    content: field => {
      const days = Math.ceil(
        (new Date(field.snoozeEnd) - new Date()) / 86400000
      );
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    },
    views: [VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Assigned",
    field: "assigned",
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "SN Ticket #",
    field: "snoozeInformation",
    content: field => {
      // TODO: Only return snoozeDetails that match Regex
      return field.snoozeDetails;
    },
    views: [VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Actions",
    field: "_",
    content: buttonizer("Snooze", "outline", "details"),
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Actions",
    field: "snooze_option",
    content: buttonizer("Update", "outline", "snoozeUpdate"),
    views: [VIEWS.SNOOZED_CASES.TITLE]
  }
];

const getCases = view =>
  i90_headers.filter(header => header.views.includes(view));

export default function ReceiptList(props) {
  if (!props.cases.length) {
    return <p>{props.isLoading ? "Loading..." : "No cases found."}</p>;
  }

  const header_definitions = getCases(props.view);

  return (
    <TabularList
      cases={props.cases}
      callback={props.callback}
      header_definitions={header_definitions}
    />
  );
}
