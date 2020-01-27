export const CASE_CREATION_START = "CaseCreationStart";
export const CASE_CREATION_END = "CaseCreationEnd";
export const SNOOOZE_REASON = "snoozeReason";
export const SN_TICKET = "snTicket";
export const SNOOZE_STATE = "snoozeState";
export const SEARCH = "search";
export const CASE_STATUS = "caseStatus";
export const CASE_SUBSTATUS = "caseSubStatus";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

const SNOOZE_OPTIONS: { [key in SnoozeReason]: SnoozeOption } = {
  technical_issue: {
    snoozeReason: "Technical Issue",
    shortText: "Technical Issue",
    followUp: "ServiceNow ticket ID",
    duration: 14,
    type: "LINK",
    subType: "troubleticket"
  },
  test_data: {
    snoozeReason: "Test Data - should be deleted", // Snooze Reason
    shortText: "Test Data",
    duration: 365,
    followUp: "ServiceNow ticket ID",
    type: "LINK",
    subType: "troubleticket"
  },
  record_analysis: {
    snoozeReason: "Needs record analysis to review",
    shortText: "Record Analysis",
    duration: 7,
    type: null,
    subType: null
  },
  fo_referral: {
    snoozeReason: "Stuck at field office - awaiting response",
    shortText: "Stuck at Field Office",
    followUp: "ServiceNow ticket ID",
    duration: 5,
    type: "LINK",
    subType: "troubleticket"
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

const SPECIFIC_TECHNICAL_ISSUES: TechnicalSubtype[] = [
  {
    value: "tecs_check",
    text: "Cannot refresh TECS Check"
  },
  {
    value: "undo_referral",
    text: "Undo referral"
  },
  {
    value: "unable_to_update_dob",
    text: "Unable to Update DOB"
  },
  {
    value: "unable_to_update_address",
    text: "Unable to update address"
  },
  {
    value: "unable_to_assign",
    text: "Unable to assign/un-assign"
  },
  {
    value: "card_production_error",
    text: "Card Production Error"
  },
  {
    value: "stuck_in_a_state",
    text: "Case stuck in current state, and needs to be pushed to next phase"
  },
  {
    value: "needs_to_be_closed",
    text: "Needs to be Closed"
  }
];

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
  VIEWS,
  SPECIFIC_TECHNICAL_ISSUES
};
