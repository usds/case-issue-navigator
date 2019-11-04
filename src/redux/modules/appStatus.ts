import { action } from "typesafe-actions";
import { RootAction } from "../create";

// Actions
export const appStatusActionCreators = {
  setPageTitle: (title: string) => action("app-status/SET_PAGE_TITLE", title),
  setDataIsLoading: (isLoading: boolean) =>
    action("app-status/SET_DATA_IS_LOADING", isLoading),
  setDataLoadError: (error: Error | null) =>
    action("app-status/SET_DATA_LOAD_ERROR", error)
};

type ActionCreator = typeof appStatusActionCreators;

export type AppStatusAction = ReturnType<ActionCreator[keyof ActionCreator]>;

// Initial state
export type AppStatusState = {
  pageTitle: string;
  dataFetching: {
    isLoading: boolean;
    error: Error | null;
  };
};

export const initialState: AppStatusState = {
  pageTitle: "Case Issue Navigator",
  dataFetching: {
    isLoading: false,
    error: null
  }
};

// Reducer
export default function reducer(
  state = initialState,
  action: RootAction
): AppStatusState {
  switch (action.type) {
    case "app-status/SET_PAGE_TITLE":
      return {
        ...state,
        pageTitle: action.payload
      };
    case "app-status/SET_DATA_IS_LOADING":
      return {
        ...state,
        dataFetching: {
          ...state.dataFetching,
          isLoading: action.payload
        }
      };
    case "app-status/SET_DATA_LOAD_ERROR":
      return {
        ...state,
        dataFetching: {
          ...state.dataFetching,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
