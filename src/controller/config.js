import { buttonizer } from "../view/util/buttonizer";

const SNOOZE_OPTIONS = [
  {
    value: "test_data",
    snoozeReason: "Test Data - should be deleted",
    duration: 365
  },
  {
    value: "assigned_case",
    snoozeReason: "Case has been assigned - remind me later",
    duration: 5,
    followUp: "Who is the case being assigned to?"
  },
  {
    value: "in_proceedings",
    snoozeReason: "Case is pending removal proceedings - check back later",
    duration: 30
  },
  {
    value: "fo_refferal",
    snoozeReason: "Stuck at field office - awaiting response",
    followUp: "Enter Field Office location code:",
    duration: 5
  },
  {
    value: "technical_issue",
    snoozeReason: "Technical Issue - awaiting resolution through ServiceNow",
    followUp: "ServiceNow ticket ID:",
    duration: 14
  },
  {
    value: "bcu",
    snoozeReason: "Referral to BCU or CFDO",
    followUp: "Reason for referral",
    duration: 30
  }
];

const BASE_URL = "http://localhost:8080";

const CASE_MANAGEMENT_SYSTEM = "DEFAULT";

const CASE_TYPE = "STANDARD";

const VIEWS = {
  CASES_TO_WORK: {
    ROUTE: "cases-to-work",
    TITLE: "Cases to Work"
  },
  SNOOZED_CASES: {
    ROUTE: "snoozed-cases",
    TITLE: "Snoozed Cases"
  }
};

const ELIS_CASE_BASE_URL =
  "https://internal-prod-elis2.uscis.dhs.gov/InternalApp/app/#/case/";

const I90_HEADERS = [
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

export {
  BASE_URL,
  CASE_MANAGEMENT_SYSTEM,
  CASE_TYPE,
  ELIS_CASE_BASE_URL,
  I90_HEADERS,
  SNOOZE_OPTIONS,
  VIEWS
};
