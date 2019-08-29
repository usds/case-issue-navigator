import { ToastContent, ToastOptions } from "react-toastify";

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
  [key in keyof Views]: number;
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

export type Case = {
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
  notes: Array<object>;
  previouslySnoozed: boolean;
  snoozeInformation?: {
    snoozeEnd: string;
    snoozeReason: string;
    snoozeStart: string;
  };
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

type SnoozeReason =
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
