import { action } from "typesafe-actions";
import { RootAction } from "../create";
import { Dispatch, AnyAction } from "redux";
import RestAPIClient from "../../api/RestAPIClient";

// Actions
export const casesActionCreators = {
  addCases: (cases: Case[]) => action("cases/ADD_CASES", cases),
  setCases: (cases: Case[]) => action("cases/SET_CASES", cases),
  removeCase: (receiptNumber: string) =>
    action("cases/REMOVE_CASE", receiptNumber),
  clearCases: () => action("cases/CLEAR_CASES"),
  toggleDetails: (receiptNumber: string) =>
    action("cases/TOGGLE_DETAILS", receiptNumber),
  setCaseType: (type: SnoozeState) => action("cases/SET_CASE_TYPE", type),
  setIsLoading: (isLoading: boolean) =>
    action("cases/SET_IS_LOADING", isLoading),
  setCaseSummary: (summary: Summary) =>
    action("cases/SET_CASE_SUMMARY", summary),
  setLastUpdated: (lastUpdated: string) =>
    action("cases/SET_LAST_UPDATED", lastUpdated)
};

export const loadCases = (
  type: SnoozeState,
  lastReceiptNumber?: string
) => async (dispatch: Dispatch<any>) => {
  const { setIsLoading, addCases } = casesActionCreators;
  dispatch(setIsLoading(true));
  dispatch(getCaseSummary());
  const response =
    type === "active"
      ? await RestAPIClient.cases.getActive(lastReceiptNumber)
      : await RestAPIClient.cases.getSnoozed(lastReceiptNumber);
  dispatch(setIsLoading(false));

  if (response.succeeded) {
    dispatch(addCases(response.payload));
    return;
  }

  if (response.responseReceived) {
    const errorJson = await response.responseError.getJson();
    console.error(errorJson);
  } else {
    console.error(response);
  }
};

export const getCaseSummary = () => async (dispatch: Dispatch<AnyAction>) => {
  const response = await RestAPIClient.cases.getCaseSummary();
  const { setCaseSummary, setLastUpdated } = casesActionCreators;

  if (response.succeeded) {
    const currentlySnoozed = response.payload.CURRENTLY_SNOOZED || 0;
    const neverSnoozed = response.payload.NEVER_SNOOZED || 0;
    const previouslySnoozed = response.payload.PREVIOUSLY_SNOOZED || 0;
    if (response.payload.lastUpdated) {
      dispatch(setLastUpdated(response.payload.lastUpdated));
    }
    return dispatch(
      setCaseSummary({
        CASES_TO_WORK: neverSnoozed + previouslySnoozed,
        SNOOZED_CASES: currentlySnoozed,
        PREVIOUSLY_SNOOZED: previouslySnoozed
      })
    );
  }
  if (response.responseReceived) {
    const errorJson = await response.responseError.getJson();
    console.error(errorJson);
  } else {
    console.error(response);
  }
};

type ActionCreator = typeof casesActionCreators;

export type CasesAction = ReturnType<ActionCreator[keyof ActionCreator]>;

// Initial state
export type CasesState = {
  caselist: Case[];
  type: SnoozeState;
  isLoading: boolean;
  summary: Summary;
  lastUpdated?: string;
};

export const initialState: CasesState = {
  caselist: [],
  type: "active",
  isLoading: false,
  summary: {
    CASES_TO_WORK: 0,
    SNOOZED_CASES: 0,
    PREVIOUSLY_SNOOZED: 0
  }
};

// Reducer
export default function reducer(
  state = initialState,
  action: RootAction
): CasesState {
  switch (action.type) {
    case "cases/ADD_CASES":
      return {
        ...state,
        caselist: state.caselist.concat(action.payload)
      };
    case "cases/SET_CASES":
      return {
        ...state,
        caselist: action.payload
      };
    case "cases/REMOVE_CASE":
      return {
        ...state,
        caselist: state.caselist.filter(c => c.receiptNumber !== action.payload)
      };
    case "cases/CLEAR_CASES":
      return {
        ...state,
        caselist: []
      };
    case "cases/SET_CASE_TYPE":
      return {
        ...state,
        type: action.payload
      };
    case "cases/TOGGLE_DETAILS":
      return {
        ...state,
        caselist: state.caselist.map(c => {
          if (c.receiptNumber === action.payload) {
            return {
              ...c,
              showDetails: !c.showDetails
            };
          }
          return c;
        })
      };
    case "cases/SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload
      };
    case "cases/SET_CASE_SUMMARY":
      return { ...state, summary: action.payload };
    case "cases/SET_LAST_UPDATED":
      return { ...state, lastUpdated: action.payload };
    default:
      return state;
  }
}
