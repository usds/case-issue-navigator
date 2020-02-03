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
type SubType = "troubleticket" | "fieldoffice" | "referral" | "subreason";

type Summary = {
  [key in keyof Views | "PREVIOUSLY_SNOOZED"]: number;
};

type ToastNotifier = (
  message: ToastContent,
  type: ToastOptions["type"]
) => void;

type Subreason =
  | "tecs_check"
  | "undo_referral"
  | "unable_to_update_dob"
  | "unable_to_update_address"
  | "unable_to_assign"
  | "card_production_error"
  | "stuck_in_a_state"
  | "needs_to_be_closed";

interface TechnicalSubtype {
  value: Subreason;
  text: string;
}

interface CallbackState {
  snoozeReason: CaseProblem;
  subreason: Subreason | undefined;
  followUp: string;
  caseIssueNotes: string;
  duration: number;
}

interface RowData {
  receiptNumber: string;
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

interface SNTicket {
  key: "SNTicket";
  props?;
}

interface CasesActionCreators {
  removeCase: ReturnType<
    import("./redux/modules/cases").ActionCreator.removeCase
  >;
  updateSnooze: ReturnType<
    import("./redux/modules/cases").ActionCreator.updateSnooze
  >;
}

interface ActionsProps {
  updateSummaryData: () => Dispatch<AnyAction>;
  setError: Dispatch<APIError>;
  setNotification: Dispatch<AnyAction>;
  removeCase: Dispatch<CasesActionCreators["removeCase"]>;
}

interface Actions {
  key: "actions";
  props: ActionsProps;
}

interface SnoozeActionsProps {
  updateSummaryData: () => void;
  setError: Dispatch<APIError>;
  setNotification: Dispatch<React.SetStateAction<AppNotification>>;
  onSnoozeUpdate: ReturnType<CasesActionCreators["updateSnooze"]>;
  removeCase: Dispatch<CasesActionCreators["removeCase"]>;
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
  | SNTicket
  | Actions
  | SnoozeActions;

interface Header {
  header: string;
  field?: keyof Case;
  content: Function | "LINK" | "DATE";
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
}

interface UserInformation {
  id: string;
  name: string;
}

type SnoozeInformation = {
  snoozeEnd: string;
  snoozeReason: CaseProblem;
  snoozeStart: string;
  snoozeResolved: string | "null";
  user: UserInformation;
};

type AttachmentType = "CORRELATION_ID" | "LINK" | "COMMENT" | "TAG";

type CaseStatusOptions =
  | "Approved"
  | "Denied"
  | "In Process"
  | "Terminated"
  | "Pending"
  | "Fee Payment Issues"
  | "Overdue Biometric Payment"
  | "Withdrawn"
  | "Administratively Closed"
  | "In Suspense"
  | "Request A-File";

type CaseSubstatusOptions =
  | "ASC Appt. Completed"
  | "ASC Appt. Requested"
  | "ASC Appt. Scheduled"
  | "Awaiting Decision Notice"
  | "Awaiting RFE Notice Generation"
  | "Card Produced"
  | "Card Production Failed"
  | "In Process"
  | "Pending Biometric Fee Payment"
  | "Producing Card"
  | "Ready for Pre-Adjudication"
  | "Ready For Adjudication"
  | "Referred to Field Office"
  | "Returning to Adjudications"
  | "RFE Response"
  | "Supervisory Review Completed"
  | "Supervisory Review Requested";

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

type CaseProblem =
  | "test_data"
  | "fo_referral"
  | "technical_issue"
  | "record_analysis";
type ProblemSelection = CaseProblem | "all" | "exists" | "doesn't exist";

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
  value: CaseProblem;
}

type SnoozeState = "ALL" | "TRIAGED" | "ALARMED" | "UNCHECKED";

type SnoozeEvent = {
  date: Date;
  startOrEnd: "start" | "end";
  snoozeReason: CaseProblem;
};

type CaseDetail = {
  date: Date;
  noteOrSnooze: "note" | "snooze";
  type: string | null;
  subType?: SubType | null;
  snoozeReason?: CaseProblem;
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
