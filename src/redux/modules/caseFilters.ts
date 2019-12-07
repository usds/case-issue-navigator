import { action } from "typesafe-actions";
import { RootAction } from "../create";
import { createBrowserHistory } from "history";
import {
  CASE_CREATION_START,
  CASE_CREATION_END,
  SNOOOZE_REASON,
  SN_TICKET
} from "../../controller/config";

const history = createBrowserHistory();
const pushURLParam = (param: string, value?: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (value) {
    urlParams.set(CASE_CREATION_START, value);
  } else {
    urlParams.delete(CASE_CREATION_START);
  }
  history.push({
    pathname: window.location.pathname,
    search: `?${urlParams.toString()}`
  });
}

// Actions
export const caseFilterActionCreators = {
  setCaseCreationStart: (caseCreationStart?: Date) =>
    action("caseFilters/SET_CASE_CREATION_START", caseCreationStart),
  setCaseCreationEnd: (caseCreationEnd?: Date) =>
    action("caseFilters/SET_CASE_CREATION_END", caseCreationEnd),
  setSnoozeReasonFilter: (snoozeReason?: SnoozeReason) =>
    action("caseFilters/SET_SNOOZE_REASON_FILTER", snoozeReason),
  setServiceNowFilter: (serviceNowFilter?: boolean) =>
    action("caseFilters/SET_SERVICE_NOW_FILTER", serviceNowFilter)
};

type ActionCreator = typeof caseFilterActionCreators;

export type CaseFilterAction = ReturnType<ActionCreator[keyof ActionCreator]>;

// Initial state
export type CaseFilterState = {
  caseCreationStart?: Date;
  caseCreationEnd?: Date;
  snoozeReasonFilter?: SnoozeReason;
  serviceNowFilter?: boolean;
};

export const initialState: CaseFilterState = {};

// Reducer
export default function reducer(
  state = initialState,
  action: RootAction
): CaseFilterState {
  switch (action.type) {
    case "caseFilters/SET_CASE_CREATION_START":
      pushURLParam(CASE_CREATION_START, action.payload? action.payload.toLocaleDateString() : undefined);
      return { ...state, caseCreationStart: action.payload };
    case "caseFilters/SET_CASE_CREATION_END":
      pushURLParam(CASE_CREATION_END, action.payload? action.payload.toLocaleDateString() : undefined);
      return { ...state, caseCreationEnd: action.payload };
    case "caseFilters/SET_SNOOZE_REASON_FILTER":
      pushURLParam(SNOOOZE_REASON, action.payload);
      return { ...state, snoozeReasonFilter: action.payload };
    case "caseFilters/SET_SERVICE_NOW_FILTER":
      pushURLParam(SN_TICKET, action.payload? action.payload.toString() : undefined);
      return { ...state, serviceNowFilter: action.payload };
    default:
      return state;
  }
}
