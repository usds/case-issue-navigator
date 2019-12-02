import { RootState } from "../create";
import { Dispatch, AnyAction } from "redux";
import RestAPIClient from "../../api/RestAPIClient";
import { casesActionCreators } from "./cases";
import { ThunkDispatch } from "redux-thunk";

export const loadCases = () => async (
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState
) => {
  const { setIsLoading, addCases } = casesActionCreators;
  const { cases } = getState();
  const { caselist, type, caseCreationEnd, caseCreationStart } = cases;

  const lastReceiptNumber =
    caselist.length > 0
      ? caselist[caselist.length - 1].receiptNumber
      : undefined;

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
