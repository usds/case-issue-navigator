export const CASE_CREATION_START = "CaseCreationStart";
export const CASE_CREATION_END = "CaseCreationEnd";
export const SNOOOZE_REASON = "snoozeReason";
export const SN_TICKET = "snTicket";
export const SNOOZE_STATE = "snoozeState";
export const SEARCH = "search";
export const CASE_STATUS = "caseStatus";
export const CASE_SUBSTATUS = "caseSubStatus";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

const SNOOZE_OPTIONS: { [key in CaseProblem]: SnoozeOption } = {
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
        value: key as CaseProblem
      }
    ];
  },
  []
);

const ELIS_CASE_STATUS = [
  { text: "Approved", value: "Approved" },
  { text: "Denied", value: "Denied" },
  { text: "In Process", value: "In Process" },
  { text: "Terminated", value: "Terminated" },
  { text: "Pending", value: "Pending" },
  { text: "Fee Payment Issues", value: "Fee Payment Issues" },
  { text: "Overdue Biometric Payment", value: "Overdue Biometric Payment" },
  { text: "Withdrawn", value: "Withdrawn" },
  { text: "Administratively Closed", value: "Administratively Closed" },
  { text: "In Suspense", value: "In Suspense" },
  { text: "Request A-File", value: "Request A-File" }
];

const ELIS_CASE_SUBSTATUS = [
  { text: "ASC Appt. Completed", value: "ASC Appt. Completed" },
  { text: "ASC Appt. Requested", value: "ASC Appt. Requested" },
  { text: "ASC Appt. Scheduled", value: "ASC Appt. Scheduled" },
  { text: "Awaiting Decision Notice", value: "Awaiting Decision Notice" },
  {
    text: "Awaiting RFE Notice Generation",
    value: "Awaiting RFE Notice Generation"
  },
  { text: "Card Produced", value: "Card Produced" },
  { text: "Card Production Failed", value: "Card Production Failed" },
  { text: "In Process", value: "In Process" },
  {
    text: "Pending Biometric Fee Payment",
    value: "Pending Biometric Fee Payment"
  },
  { text: "Producing Card", value: "Producing Card" },
  { text: "Ready for Pre-Adjudication", value: "Ready for Pre-Adjudication" },
  { text: "Ready For Adjudication", value: "Ready For Adjudication" },
  { text: "Referred to Field Office", value: "Referred to Field Office" },
  { text: "Returning to Adjudications", value: "Returning to Adjudications" },
  { text: "RFE Response", value: "RFE Response" },
  {
    text: "Supervisory Review Completed",
    value: "Supervisory Review Completed"
  },
  {
    text: "Supervisory Review Requested",
    value: "Supervisory Review Requested"
  }
];

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
  SPECIFIC_TECHNICAL_ISSUES,
  ELIS_CASE_STATUS,
  ELIS_CASE_SUBSTATUS
};
