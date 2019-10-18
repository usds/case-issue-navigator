import React from "react";
import { buttonizer } from "../view/util/buttonizer";
import { ChevronToggle } from "../view/util/ChevronToggle";
import NoteUtils from "../utils/NoteUtils";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

const SNOOZE_OPTIONS: {[key in SnoozeReason]: SnoozeOption} = {
  test_data: {
    snoozeReason: "Test Data - should be deleted", // Snooze Reason
    shortText: "Test Data",
    duration: 365,
    type: null,
    subType: null
  },
  assigned_case: {
    snoozeReason: "Case has been assigned - remind me later",
    shortText: "Assigned",
    duration: 5,
    followUp: "Who is the case being assigned to?",
    type: "TAG",
    subType: "assignee"
  },
  in_proceedings: {
    snoozeReason: "Case is pending removal proceedings - check back later",
    shortText: "Pending Removal",
    duration: 30,
    type: null,
    subType: null
  },
  fo_referral: {
    snoozeReason: "Stuck at field office - awaiting response",
    shortText: "Stuck at Field Office",
    followUp: "Enter Field Office location code:",
    duration: 5,
    type: "COMMENT",
    subType: null
  },
  technical_issue: {
    snoozeReason: "Technical Issue - awaiting resolution through ServiceNow",
    shortText: "Technical Issue",
    followUp: "ServiceNow ticket ID:",
    duration: 14,
    type: "LINK",
    subType: "troubleticket"
  },
  bcu: {
    snoozeReason: "Referral to BCU or CFDO",
    shortText: "Referral",
    followUp: "Reason for referral",
    duration: 30,
    type: "COMMENT",
    subType: null
  }
};

const SNOOZE_OPTIONS_SELECT = Object.entries(SNOOZE_OPTIONS).reduce(
  (acc: SnoozeOptionValue[], [key, val]) => {
    return [
      ...acc,
      {
        ...val,
        value: key as SnoozeReason
      }
    ];
  },
  []
);

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const DEFAULT_RESULTS_PER_PAGE = 20;

const VIEWS = {
  CASES_TO_WORK: {
    ROUTE: "",
    TITLE: "Cases to Work"
  },
  SNOOZED_CASES: {
    ROUTE: "snoozed-cases",
    TITLE: "Snoozed Cases"
  }
};

const ELIS_CASE_BASE_URL =
  process.env.REACT_APP_CASE_MANAGEMENT_SYSTEM_BASE_URL || "";


interface I90_header {
  header: string;
  field: string;
  content: Function | string;
  views: string[];
}

const I90_HEADERS: I90_header[] = [
  {
    header: "",
    field: "showDetails",
    content: (showDetails: boolean, rowData: any, _: any,  callback: Callbacks) => {
      const toggle = () => callback.toggleDetails(rowData.receiptNumber);
      return <ChevronToggle toggle={toggle} open={showDetails} />;
    },
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
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
    content: (d: string) => {
      const days = Math.ceil((new Date().valueOf() - new Date(d).valueOf()) / 86400000);
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    }
  },
  {
    header: "Case Creation",
    field: "caseCreation",
    content: "DATE",
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Application Reason",
    field: "extraData",
    content: (field: CaseExtraData) => field.applicationReason,
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Case Status",
    field: "extraData",
    content: (field: CaseExtraData) => field.caseStatus,
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Case Substatus",
    field: "extraData",
    content: (field: CaseExtraData) => field.caseSubstatus,
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Platform",
    field: "extraData",
    content: (d: CaseExtraData) => (String(d.i90SP) === "true" ? "SP" : "Legacy"),
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Problem",
    field: "snoozeInformation",
    content: (field: SnoozeInformation) =>
      SNOOZE_OPTIONS[field.snoozeReason]
        ? SNOOZE_OPTIONS[field.snoozeReason].shortText
        : field.snoozeReason,
    views: [VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Snoozed",
    field: "snoozeInformation",
    content: (field: SnoozeInformation) => {
      const days = Math.ceil(
        (new Date(field.snoozeEnd).valueOf() - new Date().valueOf()) / 86400000
      );
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    },
    views: [VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Assigned",
    field: "notes",
    content: NoteUtils.getAssignee,
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "SN Ticket #",
    field: "notes",
    content: (notes?: DBNote[]) => {
      if (!notes || !Array.isArray(notes)) {
        return null;
      }
      const tickets = notes
        .filter(note => note.subType === "troubleticket")
        .sort((a, b) => {
          return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
        });
      if (tickets.length === 0) {
        return null;
      }
      return tickets.map(ticket => (
        <React.Fragment key={ticket.content}>
          <a href={ticket.href ? ticket.href : undefined} target="_blank" rel="noopener noreferrer">
            {ticket.content}
          </a>
          <br />
        </React.Fragment>
      ));
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
    content: buttonizer("Update", "outline", "details"),
    views: [VIEWS.SNOOZED_CASES.TITLE]
  }
];

export {
  API_BASE_URL,
  DEFAULT_RESULTS_PER_PAGE,
  ELIS_CASE_BASE_URL,
  I90_HEADERS,
  IS_TEST_ENV,
  SNOOZE_OPTIONS,
  SNOOZE_OPTIONS_SELECT,
  VIEWS
};
