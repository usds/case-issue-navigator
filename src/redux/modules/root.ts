import { action } from "typesafe-actions";
import { combineReducers, AnyAction } from "redux";
import appStatusReducer, { AppStatusState } from "./appStatus";
import casesReducer, { CasesState } from "./cases";
import caseFilterReducer, { CaseFilterState } from "./caseFilters";

const userLogout = "root/USER_LOGOUT";

export const rootActionCreators = {
  userLogout: () => action(userLogout)
};

interface AppState {
  appStatus: AppStatusState;
  cases: CasesState;
  caseFilters: CaseFilterState;
}

export const rootReducer = (state: AppState | undefined, action: AnyAction) => {
  if (action.type === userLogout) {
    state = undefined;
  }
  return appReducer(state, action);
};

const appReducerMapObject = {
  appStatus: appStatusReducer,
  cases: casesReducer,
  caseFilters: caseFilterReducer
};

export const appReducer = combineReducers(appReducerMapObject);
