import { RootState } from "../create";
import { Dispatch, AnyAction } from "redux";
import RestAPIClient from "../../api/RestAPIClient";
import { casesActionCreators } from "./cases";
import { ThunkDispatch } from "redux-thunk";
import { async } from "q";

const getCases = async (
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState,
  setList: "concat" | "replace"
) => {
  const { setIsLoading, addCases, setCases } = casesActionCreators;
  const { cases } = getState();
  const { caselist, type, caseCreationEnd, caseCreationStart } = cases;

  let lastReceiptNumber = undefined
  if (caselist.length > 0 && setList === "concat") {
    lastReceiptNumber = caselist[caselist.length - 1].receiptNumber;
  }

  dispatch(setIsLoading(true));
  dispatch(getCaseSummary());
  const response =
    type === "active"
      ? await RestAPIClient.cases.getCases(
          "ACTIVE",
          lastReceiptNumber,
          caseCreationStart,
          caseCreationEnd
        )
      : await RestAPIClient.cases.getCases(
          "SNOOZED",
          lastReceiptNumber,
          caseCreationStart,
          caseCreationEnd
        );
  dispatch(setIsLoading(false));

  if (response.succeeded) {
    if (setList === "concat") {
      dispatch(addCases(response.payload));
    } else {
      dispatch(setCases(response.payload));
    }
    return;
  }

  if (response.responseReceived) {
    const errorJson = await response.responseError.getJson();
    console.error(errorJson);
  } else {
    console.error(response);
  }
};

export const loadCases = () => async (
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState
) => {
  getCases(dispatch, getState, "concat");
};

export const reLoadCases = () => async (
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState
) => {
  getCases(dispatch, getState, "replace");
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
