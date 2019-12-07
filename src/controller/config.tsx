export const CASE_CREATION_START = "CaseCreationStart";
export const CASE_CREATION_END = "CaseCreationEnd";
export const SNOOOZE_REASON = "snoozeReason";
export const SN_TICKET = "snTicket";
export const SNOOZE_STATE = "snoozeState";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

const SNOOZE_OPTIONS: { [key in SnoozeReason]: SnoozeOption } = {
  test_data: {
    snoozeReason: "Test Data - should be deleted", // Snooze Reason
    shortText: "Test Data",
    duration: 365,
    followUp: "ServiceNow ticket ID",
    type: "LINK",
    subType: "troubleticket"
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
    followUp: "Field Office location code",
    duration: 5,
    type: "TAG",
    subType: "fieldoffice"
  },
  technical_issue: {
    snoozeReason: "Technical Issue",
    shortText: "Technical Issue",
    followUp: "ServiceNow ticket ID",
    duration: 14,
    type: "LINK",
    subType: "troubleticket"
  },
  record_analysis: {
    snoozeReason: "Needs record analysis to review",
    shortText: "Record Analysis",
    duration: 7,
    type: null,
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
  }
};

const ELIS_CASE_BASE_URL =
  process.env.REACT_APP_CASE_MANAGEMENT_SYSTEM_BASE_URL || "";

export {
  API_BASE_URL,
  DEFAULT_RESULTS_PER_PAGE,
  ELIS_CASE_BASE_URL,
  IS_TEST_ENV,
  SNOOZE_OPTIONS,
  SNOOZE_OPTIONS_SELECT,
  VIEWS
};
