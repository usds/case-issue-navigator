import { ToastContent, ToastOptions } from "react-toastify";
import { number } from "prop-types";

interface Views {
  CASES_TO_WORK: {
    title: "Cases to Work";
    route: "";
  };
  SNOOZED_CASES: {
    title: "Snoozed Cases";
    route: "snoozed-cases";
  };
}

type ViewTitles = Views[keyof Views]["title"];

export type Summary = {
  [key in keyof Views | "PREVIOUSLY_SNOOZED"]: number;
};

export type ToastNotifier = (
  message: ToastContent,
  type: ToastOptions["type"]
) => void;

export type Callbacks = {
  [key: string]: Function;
};

export type Header = {
  header: string;
  field: string;
  content?: Function | String;
  views: Array<ViewTitles>;
};

export interface Case {
  receiptNumber: string;
  caseCreation: string;
  extraData: {
    extraData: {
      caseStatus: string;
      caseState: string;
      caseSubstatus: string;
      channelType: string;
      streamlinedProcess: boolean;
      applicationReason: string;
    };
  };
  notes: Array<Note>;
  previouslySnoozed: boolean;
  snoozeInformation?: SnoozeInformation;
}

export type SnoozeInformation = {
  snoozeEnd: string;
  snoozeReason: SnoozeReason;
  snoozeStart: string;
};

export interface Note {
  content: string;
  type: string | null;
  subType: string | null;
  href?: string | null;
}

export interface DBNote extends Note {
  timestamp: string;
}

export type SnoozeReason =
  | "assigned_case"
  | "test_data"
  | "in_proceedings"
  | "fo_referral"
  | "technical_issue"
  | "bcu";

export interface SnoozeOption {
  snoozeReason: SnoozeReason;
  duration: number;
  followUp?: string;
  caseIssueNotes?: string;
}

export type SnoozeEvent = {
  date: Date;
  startOrEnd: "start" | "end";
  snoozeReason: SnoozeReason;
};
