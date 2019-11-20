import { action } from "typesafe-actions";
import { combineReducers, AnyAction } from "redux";
import appStatusReducer, { AppStatusState } from "./appStatus";
import casesReducer, { CasesState } from "./cases";

export const rootActionCreators = {
  userLogout: () => action("root/USER_LOGOUT")
};

interface AppState {
  appStatus: AppStatusState;
  cases: CasesState;
}

export const rootReducer = (state: AppState | undefined, action: AnyAction) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

const appReducerMapObject = {
  appStatus: appStatusReducer,
  cases: casesReducer
};

export const appReducer = combineReducers(appReducerMapObject);
