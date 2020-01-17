import { RootState } from "../create";
import { Dispatch, AnyAction } from "redux";
import RestAPIClient from "../../api/RestAPIClient";
import { casesActionCreators } from "./cases";
import { ThunkDispatch } from "redux-thunk";
import NoteUtils from "../../utils/NoteUtils";
import { RESULTS_PER_PAGE } from "../../api/URLs";

const serviceNowCaseFilter = (c: Case) => {
  if (
    ["test_data", "technical_issue"].includes(
      (c.snoozeInformation as SnoozeInformation).snoozeReason
    )
  ) {
    if (NoteUtils.getFollowUp(c.notes, "troubleticket")) {
      return true;
    }
  }
  return false;
};

export const loadCases = (reciptnumber?: string) => async (
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState
) => {
  const { setIsLoading, addCases, setHasMoreCases } = casesActionCreators;
  const { cases, caseFilters } = getState();
  const { caselist } = cases;
  const {
    caseCreationEnd,
    caseCreationStart,
    snoozeReasonFilter,
    serviceNowFilter,
    snoozeState,
    caseStatus,
    caseSubstatus
  } = caseFilters;

  const lastReceiptNumber =
    caselist.length > 0
      ? caselist[caselist.length - 1].receiptNumber
      : undefined;

  dispatch(setIsLoading(true));
  dispatch(getCaseSummary());
  const response = await RestAPIClient.cases.getCases(
    snoozeState,
    reciptnumber ? reciptnumber : lastReceiptNumber,
    caseCreationStart,
    caseCreationEnd,
    snoozeState === "SNOOZED" ? snoozeReasonFilter : undefined,
    caseStatus,
    caseSubstatus
  );
  dispatch(setIsLoading(false));

  if (response.succeeded) {
    if (response.payload.length > RESULTS_PER_PAGE) {
      response.payload.pop();
      dispatch(setHasMoreCases(true));
    } else {
      dispatch(setHasMoreCases(false));
    }
    if (snoozeState === "SNOOZED" && serviceNowFilter !== undefined) {
      const cases = serviceNowFilter
        ? response.payload.filter((c: Case) => {
            return serviceNowCaseFilter(c);
          })
        : response.payload.filter((c: Case) => {
            return !serviceNowCaseFilter(c);
          });
      if (cases.length === 0 && response.payload.length > 0) {
        const r = response.payload[response.payload.length - 1].receiptNumber;
        dispatch(loadCases(r));
      }
      dispatch(addCases(cases));
    } else {
      dispatch(addCases(response.payload));
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

export const loadSearchResults = () => async (
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState
) => {
  const { setIsLoading, addCases, clearCases } = casesActionCreators;
  const { caseFilters } = getState();
  const { search } = caseFilters;
  dispatch(setIsLoading(true));
  if (!search) {
    console.error("search called with our a query");
    return;
  }
  const response = await RestAPIClient.cases.getSearch(search);
  dispatch(setIsLoading(false));

  if (response.succeeded) {
    dispatch(clearCases());
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
