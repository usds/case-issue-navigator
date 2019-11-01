import { action } from "typesafe-actions";
import { RootAction } from "../create";

// Actions
enum CasesActionType {
  ADD_CASES = "cases/ADD_CASES"
}

export const casesActionCreators = {
  addCases: (cases: Case[]) => action(CasesActionType.ADD_CASES, cases)
};

type ActionCreator = typeof casesActionCreators;

export type CasesAction = ReturnType<ActionCreator[keyof ActionCreator]>;

// Initial state
export type CasesState = {
  caselist: Case[];
};

export const initialState: CasesState = {
  caselist: []
};

// Reducer
export default function reducer(
  state = initialState,
  action: RootAction
): CasesState {
  switch (action.type) {
    case CasesActionType.ADD_CASES:
      return {
        ...state,
        caselist: [...state.caselist].concat(action.payload)
      };
    default:
      return state;
  }
}
