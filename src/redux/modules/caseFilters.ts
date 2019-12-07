import { action } from "typesafe-actions";
import { RootAction } from "../create";
import { createBrowserHistory } from "history";
import {
  CASE_CREATION_START,
  CASE_CREATION_END,
  SNOOOZE_REASON,
  SN_TICKET,
  SNOOZE_STATE
} from "../../controller/config";

const history = createBrowserHistory();
const pushURLParam = (param: string, value?: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (value) {
    urlParams.set(param, value);
  } else {
    urlParams.delete(param);
  }
  history.push({
    pathname: window.location.pathname,
    search: `?${urlParams.toString()}`
  });
}
const clearParams = () => {
  history.push({
    pathname: window.location.pathname,
    search: ``
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
    action("caseFilters/SET_SERVICE_NOW_FILTER", serviceNowFilter),
  setSnoozeState: (snoozeState: SnoozeState) => action("caseFilters/SET_SNOOZE_STATE", snoozeState),
  clearFilters: () =>
    action("caseFilters/CLEAR_FILTERS"),
};

type ActionCreator = typeof caseFilterActionCreators;

export type CaseFilterAction = ReturnType<ActionCreator[keyof ActionCreator]>;

// Initial state
export type CaseFilterState = {
  caseCreationStart?: Date;
  caseCreationEnd?: Date;
  snoozeReasonFilter?: SnoozeReason;
  serviceNowFilter?: boolean;
  snoozeState: SnoozeState;
};

export const initialState: CaseFilterState = {
  snoozeState: "ACTIVE"
};

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
    case "caseFilters/SET_SNOOZE_STATE":
      pushURLParam(SNOOZE_STATE, action.payload);
      return {
        ...state,
        snoozeState: action.payload
      };
    case "caseFilters/CLEAR_FILTERS":
      clearParams();
      return initialState;
    default:
      return state;
  }
}
