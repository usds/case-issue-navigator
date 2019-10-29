import React from "react";
import { ChevronToggle } from "../view/util/ChevronToggle";
import NoteUtils from "../utils/NoteUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { SnoozeFormWrapper } from "./SnoozeFormWrapper";
import { UpdateSnoozeFormWrapper } from "./UpdateSnoozeFormWrapper";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

const SNOOZE_OPTIONS: { [key in SnoozeReason]: SnoozeOption } = {
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

const I90_HEADERS = {
  showDetails: {
    header: "",
    render: (rowData: Case, props: ShowDetails["props"]) => (
      <ChevronToggle
        toggle={() => props.toggleDetails(rowData.receiptNumber)}
        open={rowData.showDetails}
      />
    )
  },
  receiptNumber: {
    header: "Receipt Number",
    render: (rowData: Case) => {
      const receiptNumber = rowData.receiptNumber;
      return (
        <>
          <a href={ELIS_CASE_BASE_URL + receiptNumber} target="_elis_viewer">
            {receiptNumber}
          </a>
          {rowData && rowData.previouslySnoozed && (
            <React.Fragment>
              &nbsp;
              <FontAwesomeIcon
                icon="exclamation-triangle"
                className="text-accent-warm"
                aria-label="Snooze expired - Please review case"
                data-tip
                data-place="right"
              />
              <ReactTooltip>Snooze expired - Please review case</ReactTooltip>
            </React.Fragment>
          )}
        </>
      );
    }
  },
  caseAge: {
    header: "Case Age",
    render: (rowData: Case) => {
      const d = rowData.caseCreation;
      const days = Math.ceil(
        (new Date().valueOf() - new Date(d).valueOf()) / 86400000
      );
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    }
  },
  caseCreation: {
    header: "Case Creation",
    render: (rowData: Case) => {
      const d = rowData.caseCreation;
      const datum = new Date(d);

      if (d && !isNaN(datum as any)) {
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
    }
  },
  applicationReason: {
    header: "Application Reason",
    render: (rowData: Case) => rowData.extraData.applicationReason
  },
  caseStatus: {
    header: "Case Status",
    render: (rowData: Case) => rowData.extraData.caseStatus
  },
  caseSubstatus: {
    header: "Case Substatus",
    render: (rowData: Case) => rowData.extraData.caseSubstatus
  },
  platform: {
    header: "Platform",
    render: (rowData: Case) =>
      String(rowData.extraData.i90SP) === "true" ? "SP" : "Legacy"
    //views: ["Cases to Work", "Snoozed Cases"]
  },
  problem: {
    header: "Problem",
    render: (rowData: Case) => {
      const reason = rowData.snoozeInformation
        ? rowData.snoozeInformation.snoozeReason
        : undefined;
      if (!reason) {
        console.error("Snooze information not found");
        return;
      }
      return SNOOZE_OPTIONS[reason] ? SNOOZE_OPTIONS[reason].shortText : reason;
    }
  },
  snoozed: {
    header: "Snoozed",
    render: (rowData: Case) => {
      const snoozeEnd = rowData.snoozeInformation
        ? rowData.snoozeInformation.snoozeEnd
        : undefined;
      if (!snoozeEnd) {
        console.error("Snooze information not found");
        return;
      }
      const days = Math.ceil(
        (new Date(snoozeEnd).valueOf() - new Date().valueOf()) / 86400000
      );
      const plural = days === 1 ? "" : "s";
      return `${days} day${plural}`;
    }
  },
  assigned: {
    header: "Assigned",
    render: (rowData: Case) => NoteUtils.getAssignee(rowData.notes)
  },
  SNTicket: {
    header: "SN Ticket #",
    render: (rowData: Case) => {
      if (!rowData.notes) {
        return null;
      }
      const tickets = rowData.notes
        .filter(note => note.subType === "troubleticket")
        .sort((a, b) => {
          return (
            new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
          );
        });
      if (tickets.length === 0) {
        return null;
      }
      return tickets.map(ticket => (
        <React.Fragment key={ticket.content}>
          <a
            href={ticket.href ? ticket.href : undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ticket.content}
          </a>
          <br />
        </React.Fragment>
      ));
    }
  },
  actions: {
    header: "Actions",
    render: (rowData: Case, props: Actions["props"]) => (
      <SnoozeFormWrapper rowData={rowData} {...props} />
    )
  },
  snoozeActions: {
    header: "Actions",
    render: (rowData: Case, props: SnoozeActions["props"]) => (
      <UpdateSnoozeFormWrapper rowData={rowData} {...props} />
    )
  }
};

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
