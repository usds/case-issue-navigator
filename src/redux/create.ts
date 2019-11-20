import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { AppStatusAction } from "./modules/appStatus";
import { CasesAction } from "./modules/cases";
import { rootReducer } from "./modules/root";

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

export { rootReducer };
export type RootAction = AppStatusAction | CasesAction;
export type Store = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
