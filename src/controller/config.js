import React from "react";
import UsaButton from "../view/util/UsaButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { approximateDays } from "../view/util/approximateDays";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

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
    content: data => (
      <React.Fragment>
        <a href={ELIS_CASE_BASE_URL + data.receiptNumber} target="_elis_viewer">
          {data.receiptNumber}
        </a>
        {data && data.desnoozed ? (
          <FontAwesomeIcon
            icon="exclamation-triangle"
            className="text-accent-warm"
          />
        ) : null}
      </React.Fragment>
    ),
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Case Age",
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE],
    content: data => {
      const days = approximateDays({
        startDate: data.caseCreation,
        endDate: Date()
      });
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    }
  },
  {
    header: "Case Creation",
    content: data => {
      const datum = new Date(data.caseCreation);

      if (data.caseCreation && !isNaN(datum)) {
        return (
          datum.getMonth() +
          1 +
          "/" +
          datum.getDate() +
          "/" +
          datum.getFullYear()
        );
      }

      return "Invalid date";
    },
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Case Status",
    content: data => data.extraData.caseStatus,
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Case Substatus",
    content: data => data.extraData.caseSubstatus,
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Platform",
    content: data =>
      data.extraData.streamlinedProcess === "true" ? "SP" : "Legacy",
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Problem",
    content: data => data.snoozeInformation.snoozeReason,
    views: [VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Snoozed",
    content: data => {
      const days = Math.ceil(
        (new Date(data.snoozeInformation.snoozeEnd) - new Date()) / 86400000
      );
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    },
    views: [VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Assigned",
    content: () => "TBD",
    views: [VIEWS.CASES_TO_WORK.TITLE, VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "SN Ticket #",
    content: data => {
      // TODO: Only return snoozeDetails that match Regex
      return data.snoozeInformation.snoozeDetails;
    },
    views: [VIEWS.SNOOZED_CASES.TITLE]
  },
  {
    header: "Actions",
    content: (data, callbacks) => (
      <UsaButton buttonStyle="outline" onClick={() => callbacks.details(data)}>
        Snooze
      </UsaButton>
    ),
    views: [VIEWS.CASES_TO_WORK.TITLE]
  },
  {
    header: "Actions",
    content: (data, callbacks) => (
      <UsaButton
        buttonStyle="outline"
        onClick={() => callbacks.snoozeUpdate(data)}
      >
        Update
      </UsaButton>
    ),
    views: [VIEWS.SNOOZED_CASES.TITLE]
  }
];

export {
  BASE_URL,
  CASE_MANAGEMENT_SYSTEM,
  CASE_TYPE,
  ELIS_CASE_BASE_URL,
  I90_HEADERS,
  IS_TEST_ENV,
  SNOOZE_OPTIONS,
  VIEWS
};
