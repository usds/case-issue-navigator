import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import appStatusReducer, { AppStatusAction } from "./modules/appStatus";

export const rootReducer = combineReducers({
  appStatus: appStatusReducer
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

export type RootAction = AppStatusAction;
export type Store = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
