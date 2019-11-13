import { action } from "typesafe-actions";
import { RootAction } from "../create";

// Actions
export const appStatusActionCreators = {
  setPageTitle: (title: string) => action("app-status/SET_PAGE_TITLE", title),
  setDataIsLoading: (isLoading: boolean) =>
    action("app-status/SET_DATA_IS_LOADING", isLoading),
  setDataLoadError: (error: APIError | null) =>
    action("app-status/SET_DATA_LOAD_ERROR", error),
  setNotification: (notification: AppNotification) =>
    action("app-status/SET_NOTIFICATION", notification),
  setUser: (user: UserInformation) => action("app-status/SET_USER", user),
  clearUser: () => action("app-status/CLEAR_USER"),
  setIsInitializing: (isInitializing: boolean) =>
    action("app-status/SET_IS_INITIALIZING", isInitializing)
};

type ActionCreator = typeof appStatusActionCreators;

export type AppStatusAction = ReturnType<ActionCreator[keyof ActionCreator]>;

// Initial state
export type AppStatusState = {
  pageTitle: string;
  dataFetching: {
    isLoading: boolean;
    error: APIError | null;
  };
  notification?: AppNotification;
  user?: UserInformation;
  isInitializing: boolean;
};

export const initialState: AppStatusState = {
  pageTitle: "Case Issue Navigator",
  dataFetching: {
    isLoading: false,
    error: null
  },
  isInitializing: true
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
    case "app-status/SET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload
      };
    case "app-status/SET_USER":
      return {
        ...state,
        user: action.payload
      };
    case "app-status/CLEAR_USER":
      return { ...state, user: undefined };
    case "app-status/SET_IS_INITIALIZING":
      return { ...state, isInitializing: action.payload };
    default:
      return state;
  }
}
