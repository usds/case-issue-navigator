import { action } from "typesafe-actions";
import { RootAction } from "../create";

// Actions
enum AppStatusActionType {
  SET_PAGE_TITLE = "case-issue-navigator/app-status/SET_PAGE_TITLE",
  SET_DATA_IS_LOADING = "case-issue-navigator/app-status/SET_DATA_IS_LOADING",
  SET_DATA_LOAD_ERROR = "case-issue-navigator/app-status/SET_DATA_LOAD_ERROR"
}

export const appStatusActionCreators = {
  setPageTitle: (title: string) =>
    action(AppStatusActionType.SET_PAGE_TITLE, title),
  setDataIsLoading: (isLoading: boolean) =>
    action(AppStatusActionType.SET_DATA_IS_LOADING, isLoading),
  setDataLoadError: (error: Error | null) =>
    action(AppStatusActionType.SET_DATA_LOAD_ERROR, error)
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
    case AppStatusActionType.SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload
      };
    case AppStatusActionType.SET_DATA_IS_LOADING:
      return {
        ...state,
        dataFetching: {
          ...state.dataFetching,
          isLoading: action.payload
        }
      };
    case AppStatusActionType.SET_DATA_LOAD_ERROR:
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
