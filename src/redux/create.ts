import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import appStatusReducer, { AppStatusAction } from "./modules/appStatus";
import casesReducer, { CasesAction } from "./modules/cases";

export const rootReducer = combineReducers({
  appStatus: appStatusReducer,
  cases: casesReducer
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

export type RootAction = AppStatusAction | CasesAction;
export type Store = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
