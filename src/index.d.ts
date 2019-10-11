declare module "react-piwik";

type MatomoEventCategory = "snooze";
type MatomoEventAction = "createSnooze" | "reSnooze" | "deSnooze";
type MatomoEventName = string;
type MatomoEventValue = number;

type MatomoTrackEvent = (
  category: MatomoEventCategory,
  action: MatomoEventAction,
  name: MatomoEventName,
  value?: MatomoEventValue
) => void;

type CaseManagementSystem = "DEFAULT";
type CaseType = "STANDARD";

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

type Summary = {
  [key in keyof Views | "PREVIOUSLY_SNOOZED"]: number;
};

type ToastNotifier = (
  message: ToastContent,
  type: ToastOptions["type"]
) => void;

type Callbacks = {
  [key: string]: Function;
};

type Header = {
  header: string;
  field: string;
  content?: Function | string;
  views: Array<ViewTitles>;
};

interface Case {
  receiptNumber: string;
  caseCreation: string;
  extraData: {
    extraData: {
      caseStatus: string;
      caseState: string;
      caseSubstatus: string;
      channelType: string;
      i90SP: string | boolean;
      applicationReason: string;
    };
  };
  notes: Array<Note>;
  previouslySnoozed: boolean;
  snoozeInformation?: SnoozeInformation;
  showDetails: boolean;
}

type SnoozeInformation = {
  snoozeEnd: string;
  snoozeReason: SnoozeReason;
  snoozeStart: string;
};

interface Note {
  content: string;
  type: string | null;
  subType: string | null;
  href?: string | null;
}

interface DBNote extends Note {
  timestamp: string;
}

type SnoozeReason =
  | "assigned_case"
  | "test_data"
  | "in_proceedings"
  | "fo_referral"
  | "technical_issue"
  | "bcu";

interface SnoozeOption {
  snoozeReason: SnoozeReason;
  duration: number;
  followUp?: string;
  caseIssueNotes?: string;
}
type SnoozeState = "active" | "snoozed";

type SnoozeEvent = {
  date: Date;
  startOrEnd: "start" | "end";
  snoozeReason: SnoozeReason;
};

type CaseDetail = {
  date: Date;
  noteOrSnooze: "note" | "snooze";
  type: string | null;
  subType?: string | null;
  snoozeReason?: SnoozeReason;
  href?: string | null;
  content?: string;
};

type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "default"
  | undefined;

type AppNotification = {
  message: string;
  type: NotificationType;
  id?: string;
} | null;

type ToastOptions = {
  type: NotificationType;
  toastId?: string;
};

type APIError = {
  error: string;
  message: string;
  status: number;
  timestamp: string;
};
