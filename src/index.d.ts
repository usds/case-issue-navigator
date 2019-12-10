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
type SubType = "troubleticket" | "assignee" | "fieldoffice" | "referral";

type CaseSnoozeFilter = "ACTIVE" | "SNOOZED" | "ALARMED";

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

interface CallbackState {
  snoozeReason: SnoozeReason;
  followUp: string;
  caseIssueNotes: string;
  duration: number;
}

type Callbacks = any;

interface RowData {
  receiptNumber: string;
}

interface ShowDetails {
  key: "showDetails";
  props: {
    toggleDetails: (receiptNumber: string) => void;
  };
}

interface ReceiptNumber {
  key: "receiptNumber";
  props?;
}

interface CaseAge {
  key: "caseAge";
  props?;
}

interface CaseCreation {
  key: "caseCreation";
  props?;
}

interface ApplicationReason {
  key: "applicationReason";
  props?;
}

interface CaseStatus {
  key: "caseStatus";
  props?;
}

interface CaseSubstatus {
  key: "caseSubstatus";
  props?;
}

interface Platform {
  key: "platform";
  props?;
}

interface Problem {
  key: "problem";
  props?;
}

interface Snoozed {
  key: "snoozed";
  props?;
}

interface Assigned {
  key: "assigned";
  props?;
}
interface SNTicket {
  key: "SNTicket";
  props?;
}

declare namespace ReduxModules {
  interface Cases {
    removeCase: ReturnType<
      typeof import("./redux/modules/cases").casesActionCreators.removeCase
    >;
    updateSnooze: ReturnType<
      typeof import("./redux/modules/cases").casesActionCreators.updateSnooze
    >;
  }
}

interface ActionsProps {
  updateSummaryData: () => Dispatch<AnyAction>;
  setError: Dispatch<APIError>;
  setNotification: Dispatch<AnyAction>;
  removeCase: Dispatch<ReduxModules.Cases["removeCase"]>;
}

interface Actions {
  key: "actions";
  props: ActionsProps;
}

interface SnoozeActionsProps {
  updateSummaryData: () => void;
  setError: Dispatch<APIError>;
  setNotification: Dispatch<React.SetStateAction<AppNotification>>;
  onSnoozeUpdate: ReturnType<ReduxModules.Cases["updateSnooze"]>;
  removeCase: Dispatch<ReduxModules.Cases["removeCase"]>;
}

interface SnoozeActions {
  key: "snoozeActions";
  props: SnoozeActionsProps;
}

type I90Header =
  | ShowDetails
  | ReceiptNumber
  | CaseAge
  | CaseCreation
  | ApplicationReason
  | CaseStatus
  | CaseSubstatus
  | Platform
  | Problem
  | Snoozed
  | Assigned
  | SNTicket
  | Actions
  | SnoozeActions;

interface Header {
  header: string;
  field?: keyof Case;
  content: Function | "LINK" | "DATE";
  views: ViewTitles[];
}

interface CaseExtraData {
  caseStatus: string;
  caseState: string;
  caseSubstatus: string;
  channelType: string;
  i90SP: string | boolean;
  applicationReason: string;
  caseAge: string;
  caseId: string;
}

interface Case {
  receiptNumber: string;
  caseCreation: string;
  extraData: CaseExtraData;
  notes?: Array<Note>;
  previouslySnoozed: boolean;
  snoozeInformation?: SnoozeInformation;
  showDetails: boolean;
}

interface UserInformation {
  id: string;
  name: string;
}

type SnoozeInformation = {
  snoozeEnd: string;
  snoozeReason: SnoozeReason;
  snoozeStart: string;
  user: UserInformation;
};

type AttachmentType = "CORRELATION_ID" | "LINK" | "COMMENT" | "TAG";

interface PartialNote {
  content: string;
  type: AttachmentType | null;
  subType: SubType | null;
  href?: string | null;
}

interface Note extends PartialNote {
  href: string | null;
  user: UserInformation;
  timestamp: string;
}

type SnoozeReason =
  | "assigned_case"
  | "test_data"
  | "in_proceedings"
  | "fo_referral"
  | "technical_issue"
  | "record_analysis";

interface SnoozeOption {
  snoozeReason: string;
  duration: number;
  shortText: string;
  type: AttachmentType | null;
  subType: SubType | null;
  followUp?: string;
  caseIssueNotes?: string;
}

interface SnoozeOptionValue extends SnoozeOption {
  value: SnoozeReason;
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
  subType?: SubType | null;
  snoozeReason?: SnoozeReason;
  href?: string | null;
  content?: string;
  creator: string;
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

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: () => Function;
}
