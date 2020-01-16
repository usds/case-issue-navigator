import { action } from "typesafe-actions";
import { RootAction, RootState } from "../create";
import { createBrowserHistory } from "history";
import {
  CASE_CREATION_START,
  CASE_CREATION_END,
  SNOOOZE_REASON,
  SN_TICKET,
  SNOOZE_STATE,
  SEARCH,
  CASE_STATUS
} from "../../controller/config";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const history = createBrowserHistory();
export const pushURLParam = (param: string, value?: string) => {
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
};
export const setURLParam = (param: string, value?: string) => {
  const urlParams = new URLSearchParams();
  if (value) {
    urlParams.set(param, value);
  } else {
    urlParams.delete(param);
  }
  history.push({
    pathname: window.location.pathname,
    search: `?${urlParams.toString()}`
  });
};
const clearParams = () => {
  history.push({
    pathname: window.location.pathname,
    search: ``
  });
};

// Actions
export const caseFilterActionCreators = {
  setCaseCreationStart: (caseCreationStart?: Date) => {
    pushURLParam(
      CASE_CREATION_START,
      caseCreationStart ? caseCreationStart.toLocaleDateString() : undefined
    );
    return action("caseFilters/SET_CASE_CREATION_START", caseCreationStart);
  },
  setCaseCreationEnd: (caseCreationEnd?: Date) => {
    pushURLParam(
      CASE_CREATION_END,
      caseCreationEnd ? caseCreationEnd.toLocaleDateString() : undefined
    );
    return action("caseFilters/SET_CASE_CREATION_END", caseCreationEnd);
  },
  setSnoozeReasonFilter: (snoozeReason?: SnoozeReason) => {
    pushURLParam(SNOOOZE_REASON, snoozeReason);
    return action("caseFilters/SET_SNOOZE_REASON_FILTER", snoozeReason);
  },
  setServiceNowFilter: (serviceNowFilter?: boolean) => {
    pushURLParam(
      SN_TICKET,
      serviceNowFilter ? serviceNowFilter.toString() : undefined
    );
    return action("caseFilters/SET_SERVICE_NOW_FILTER", serviceNowFilter);
  },
  setSnoozeState: (snoozeState: SnoozeState) => {
    pushURLParam(SNOOZE_STATE, snoozeState);
    return action("caseFilters/SET_SNOOZE_STATE", snoozeState);
  },
  setCaseStatus: (caseStatus?: CaseStatusOptions) => {
    pushURLParam(CASE_STATUS, caseStatus);
    return action("caseFilters/SET_CASE_STATUS", caseStatus);
  },
  setSearch: (search?: string) => action("caseFilters/SET_SEARCH", search),
  setActiveSearch: (active: boolean): any => async (
    dispatch: ThunkDispatch<RootState, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const search = active ? getState().caseFilters.search : undefined;
    setURLParam(SEARCH, search);
    return dispatch(action("caseFilters/SET_ACTIVE_SEARCH", active));
  },
  clearFilters: () => {
    clearParams();
    return action("caseFilters/CLEAR_FILTERS");
  }
};

type ActionCreator = typeof caseFilterActionCreators;

export type CaseFilterAction = ReturnType<ActionCreator[keyof ActionCreator]>;

// Initial state
export type CaseFilterState = {
  caseCreationStart?: Date;
  caseCreationEnd?: Date;
  snoozeReasonFilter?: SnoozeReason;
  serviceNowFilter?: boolean;
  search?: string;
  snoozeState: SnoozeState;
  activeSearch: boolean;
  caseStatus?: CaseStatusOptions;
};

export const initialState: CaseFilterState = {
  snoozeState: "ACTIVE",
  activeSearch: false
};

// Reducer
export default function reducer(
  state = initialState,
  action: RootAction
): CaseFilterState {
  switch (action.type) {
    case "caseFilters/SET_CASE_CREATION_START":
      return { ...state, caseCreationStart: action.payload };
    case "caseFilters/SET_CASE_CREATION_END":
      return { ...state, caseCreationEnd: action.payload };
    case "caseFilters/SET_SNOOZE_REASON_FILTER":
      return { ...state, snoozeReasonFilter: action.payload };
    case "caseFilters/SET_SERVICE_NOW_FILTER":
      return { ...state, serviceNowFilter: action.payload };
    case "caseFilters/SET_SNOOZE_STATE":
      return {
        ...state,
        snoozeState: action.payload
      };
    case "caseFilters/SET_SEARCH":
      return {
        ...state,
        search: action.payload
      };
    case "caseFilters/SET_ACTIVE_SEARCH":
      return {
        ...state,
        activeSearch: action.payload,
        search: action.payload ? state.search : undefined
      };
    case "caseFilters/SET_CASE_STATUS":
      return { ...state, caseStatus: action.payload };
    case "caseFilters/CLEAR_FILTERS":
      return initialState;
    default:
      return state;
  }
}
