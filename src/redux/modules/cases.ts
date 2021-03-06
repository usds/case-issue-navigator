import { action } from "typesafe-actions";
import { RootAction } from "../create";

// Actions
export const casesActionCreators = {
  addCases: (cases: Case[]) => action("cases/ADD_CASES", cases),
  removeCase: (receiptNumber: string) =>
    action("cases/REMOVE_CASE", receiptNumber),
  updateSnooze: (
    receiptNumber: string,
    newNotes: Note[],
    snoozeInformation: SnoozeInformation
  ) =>
    action("cases/UPDATE_SNOOZED_CASE", {
      receiptNumber,
      newNotes,
      snoozeInformation
    }),
  clearCases: () => action("cases/CLEAR_CASES"),
  toggleDetails: (receiptNumber: string) =>
    action("cases/TOGGLE_DETAILS", receiptNumber),
  setIsLoading: (isLoading: boolean) =>
    action("cases/SET_IS_LOADING", isLoading),
  setCaseSummary: (summary: Summary) =>
    action("cases/SET_CASE_SUMMARY", summary),
  setLastUpdated: (lastUpdated: string) =>
    action("cases/SET_LAST_UPDATED", lastUpdated),
  setHasMoreCases: (hasMoreCases: boolean) =>
    action("cases/SET_HAS_MORE_CASES", hasMoreCases)
};

export type ActionCreator = typeof casesActionCreators;

export type CasesAction = ReturnType<ActionCreator[keyof ActionCreator]>;

// Initial state
export type CasesState = {
  caselist: Case[];
  isLoading: boolean;
  summary: Summary;
  hasMoreCases: boolean;
  lastUpdated?: string;
};

export const initialState: CasesState = {
  caselist: [],
  isLoading: false,
  summary: {
    CASES_TO_WORK: 0,
    SNOOZED_CASES: 0,
    PREVIOUSLY_SNOOZED: 0
  },
  hasMoreCases: true
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
    case "cases/REMOVE_CASE":
      return {
        ...state,
        caselist: state.caselist.filter(c => c.receiptNumber !== action.payload)
      };
    case "cases/UPDATE_SNOOZED_CASE":
      const { receiptNumber, newNotes, snoozeInformation } = action.payload;
      const caselist = state.caselist
        .map(snoozedCase => {
          if (snoozedCase.receiptNumber === receiptNumber) {
            const notes = snoozedCase.notes
              ? snoozedCase.notes.concat(newNotes)
              : newNotes;
            return {
              ...snoozedCase,
              snoozeInformation: snoozeInformation,
              notes
            };
          }
          return snoozedCase;
        })
        .sort((a, b) => {
          return (
            new Date(
              (a.snoozeInformation as SnoozeInformation).snoozeEnd
            ).getTime() -
            new Date().getTime() -
            (new Date(
              (b.snoozeInformation as SnoozeInformation).snoozeEnd
            ).getTime() -
              new Date().getTime())
          );
        });
      if (
        caselist[caselist.length - 1].receiptNumber === receiptNumber &&
        caselist.length < state.summary["SNOOZED_CASES"]
      ) {
        caselist.pop();
      }
      return { ...state, caselist };
    case "cases/CLEAR_CASES":
      return {
        ...state,
        caselist: []
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
    case "cases/SET_HAS_MORE_CASES":
      return { ...state, hasMoreCases: action.payload };
    default:
      return state;
  }
}
