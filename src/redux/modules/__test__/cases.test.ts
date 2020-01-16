import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer, Store, store } from "../../create";
import { casesActionCreators, initialState } from "../cases";
import { caseFilterActionCreators } from "../caseFilters";
import { loadCases, getCaseSummary } from "../casesAsync";
import RestAPIClient from "../../../api/RestAPIClient";
import { RESULTS_PER_PAGE } from "../../../api/URLs";
import thunk from "redux-thunk";

const COMMENT: AttachmentType = "COMMENT";
const initialCases: Case[] = [
  {
    receiptNumber: "ABC123",
    caseCreation: "Dec 12, 1984",
    extraData: {
      caseStatus: "",
      caseState: "",
      caseSubstatus: "",
      channelType: "",
      i90SP: true,
      applicationReason: "some reason",
      caseAge: "94 days",
      caseId: "ABC123"
    },
    previouslySnoozed: false,
    showDetails: false
  }
];
const newCases: Case[] = [
  {
    receiptNumber: "DEF567",
    caseCreation: "Dec 12, 1984",
    extraData: {
      caseStatus: "",
      caseState: "",
      caseSubstatus: "",
      channelType: "",
      i90SP: true,
      applicationReason: "some reason",
      caseAge: "94 days",
      caseId: "DEF567"
    },
    previouslySnoozed: false,
    showDetails: false
  }
];
const snoozedCases: Case[] = [
  {
    notes: [
      {
        content: "aaaa",
        type: "COMMENT",
        subType: null,
        href: null,
        user: {
          id: "admin",
          name: "admin"
        },
        timestamp: "2019-11-13T15:15:26.726+0000"
      }
    ],
    caseCreation: "2014-08-02T00:00:00-04:00",
    receiptNumber: "FKE5369954",
    extraData: {
      caseStatus: "Processing",
      caseState: "Happy",
      caseId: "41464",
      caseSubstatus: "Printing",
      channelType: "Semaphore",
      caseAge: "1843",
      applicationReason: "Boredom",
      i90SP: "true"
    },
    previouslySnoozed: false,
    snoozeInformation: {
      snoozeReason: "test_data",
      snoozeEnd: "2018-11-12T03:00:00-05:00",
      snoozeStart: "2017-11-13T10:15:26.70979-05:00",
      user: {
        id: "admin",
        name: "admin"
      }
    },
    showDetails: false
  },
  {
    notes: [],
    caseCreation: "2014-08-05T00:00:00-04:00",
    receiptNumber: "FKE9703329",
    extraData: {
      caseStatus: "Ask a Silly Question get a Silly Answer",
      caseState: "Happy",
      caseId: "89172",
      caseSubstatus: "Unfortunately Unclear",
      channelType: "Pigeon",
      caseAge: "1840",
      applicationReason: "Enthusiasm",
      i90SP: "false"
    },
    previouslySnoozed: false,
    snoozeInformation: {
      snoozeReason: "test_data",
      snoozeEnd: "2019-11-12T03:00:00-05:00",
      snoozeStart: "2017-11-13T10:27:57.319233-05:00",
      user: {
        id: "admin",
        name: "admin"
      }
    },
    showDetails: false
  },
  {
    notes: [],
    caseCreation: "2014-08-06T00:00:00-04:00",
    receiptNumber: "FKE2278368",
    extraData: {
      caseStatus: "Processing",
      caseState: "Happy",
      caseId: "61834",
      caseSubstatus: "Amazingly Successful",
      channelType: "Semaphore",
      caseAge: "1839",
      applicationReason: "Boredom",
      i90SP: "false"
    },
    previouslySnoozed: false,
    snoozeInformation: {
      snoozeReason: "test_data",
      snoozeEnd: "2020-11-12T03:00:00-05:00",
      snoozeStart: "2019-11-13T10:27:59.495681-05:00",
      user: {
        id: "admin",
        name: "admin"
      }
    },
    showDetails: false
  }
];

export const createTestStore = () =>
  createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f: any) => f
    )
  );

describe("redux - cases", () => {
  let testStore: Store;
  const {
    addCases,
    removeCase,
    updateSnooze,
    clearCases,
    toggleDetails,
    setIsLoading,
    setCaseSummary,
    setLastUpdated,
    setHasMoreCases
  } = casesActionCreators;
  const {
    setSnoozeState,
    setCaseCreationStart,
    setCaseCreationEnd,
    setSnoozeReasonFilter
  } = caseFilterActionCreators;

  beforeEach(() => {
    testStore = createStore(rootReducer, { cases: initialState });
  });
  it("adds a case to an empty case list", () => {
    const { dispatch } = testStore;
    dispatch(addCases(initialCases));
    expect(testStore.getState().cases.caselist).toEqual(initialCases);
  });
  it("adds a case to a non-empty case list", () => {
    const { dispatch } = testStore;
    dispatch(addCases(initialCases));
    dispatch(addCases(newCases));
    expect(testStore.getState().cases.caselist).toEqual(
      initialCases.concat(newCases)
    );
  });
  it("sets cases, replacing previous cases", () => {
    const { dispatch } = testStore;
    dispatch(clearCases());
    dispatch(addCases(initialCases));
    expect(testStore.getState().cases.caselist).toEqual(initialCases);
    dispatch(clearCases());
    dispatch(addCases(newCases));
    expect(testStore.getState().cases.caselist).toEqual(newCases);
  });
  it("removes a case", () => {
    const { dispatch } = testStore;
    dispatch(clearCases());
    dispatch(addCases(initialCases));
    dispatch(removeCase("ABC123"));
    expect(testStore.getState().cases.caselist).toEqual([]);
  });
  it("adds a note and snooze information to a snoozed case", () => {
    const { dispatch } = testStore;
    dispatch(clearCases());
    dispatch(addCases(snoozedCases));
    dispatch(
      updateSnooze(
        "FKE9703329",
        [
          {
            content: "hi",
            type: COMMENT,
            subType: null,
            href: null,
            user: {
              id: "911d26ef-df04-4101-a7cd-de823c0c18f4",
              name: "John Kennedy"
            },
            timestamp: "2019-11-13T15:15:26.726+0000"
          }
        ],
        {
          snoozeReason: "test_data",
          snoozeEnd: "2020-11-12T03:00:00-05:00",
          snoozeStart: "2019-11-13T10:15:26.70979-05:00",
          user: {
            id: "911d26ef-df04-4101-a7cd-de823c0c18f4",
            name: "John Kennedy"
          }
        }
      )
    );
    const updatedCases = testStore.getState().cases.caselist;
    const testCase = updatedCases.find(
      (c: Case) => c.receiptNumber === "FKE9703329"
    ) as Case;
    expect((testCase.notes as Note[]).length).toBe(1);
    expect(testCase.notes as Note[]).toEqual([
      {
        content: "hi",
        type: "COMMENT",
        subType: null,
        href: null,
        user: {
          id: "911d26ef-df04-4101-a7cd-de823c0c18f4",
          name: "John Kennedy"
        },
        timestamp: "2019-11-13T15:15:26.726+0000"
      }
    ]);
    expect(testCase.snoozeInformation as SnoozeInformation).toEqual({
      snoozeReason: "test_data",
      snoozeEnd: "2020-11-12T03:00:00-05:00",
      snoozeStart: "2019-11-13T10:15:26.70979-05:00",
      user: {
        id: "911d26ef-df04-4101-a7cd-de823c0c18f4",
        name: "John Kennedy"
      }
    });
  });
  it("sorts cases by snooze end asc", () => {
    const { dispatch } = testStore;
    dispatch(clearCases());
    dispatch(addCases(snoozedCases));
    dispatch(
      updateSnooze(
        "FKE5369954",
        [
          {
            content: "snooze for a very long time",
            type: COMMENT,
            subType: null,
            href: null,
            user: {
              id: "911d26ef-df04-4101-a7cd-de823c0c18f4",
              name: "John Kennedy"
            },
            timestamp: "2019-13-13T15:15:26.726+0000"
          }
        ],
        {
          snoozeReason: "test_data",
          snoozeEnd: "2030-01-12T03:00:00-05:00",
          snoozeStart: "2019-12-13T10:15:26.70979-05:00",
          user: {
            id: "911d26ef-df04-4101-a7cd-de823c0c18f4",
            name: "John Kennedy"
          }
        }
      )
    );
    const updatedCases = testStore.getState().cases.caselist;
    expect(updatedCases[0].receiptNumber).toEqual("FKE9703329");
    expect(updatedCases[1].receiptNumber).toEqual("FKE2278368");
    expect(updatedCases[2].receiptNumber).toEqual("FKE5369954");
  });
  it("removes the updated case if its order is unknown", () => {
    const { dispatch } = testStore;
    const summary: Summary = {
      CASES_TO_WORK: 0,
      SNOOZED_CASES: 500,
      PREVIOUSLY_SNOOZED: 0
    };
    dispatch(setCaseSummary(summary));
    dispatch(clearCases());
    dispatch(addCases(snoozedCases));
    dispatch(
      updateSnooze(
        "FKE5369954",
        [
          {
            content: "snooze for a very long time",
            type: COMMENT,
            subType: null,
            href: null,
            user: {
              id: "911d26ef-df04-4101-a7cd-de823c0c18f4",
              name: "John Kennedy"
            },
            timestamp: "2019-13-13T15:15:26.726+0000"
          }
        ],
        {
          snoozeReason: "test_data",
          snoozeEnd: "2030-01-12T03:00:00-05:00",
          snoozeStart: "2019-12-13T10:15:26.70979-05:00",
          user: {
            id: "911d26ef-df04-4101-a7cd-de823c0c18f4",
            name: "John Kennedy"
          }
        }
      )
    );
    const updatedCases = testStore.getState().cases.caselist;
    expect(updatedCases.length).toBe(2);
    expect(updatedCases[0].receiptNumber).toBe("FKE9703329");
    expect(updatedCases[1].receiptNumber).toBe("FKE2278368");
  });
  it("clears all cases", () => {
    const { dispatch } = testStore;
    dispatch(clearCases());
    dispatch(addCases(initialCases));
    dispatch(addCases(newCases));
    dispatch(clearCases());
    expect(testStore.getState().cases.caselist).toEqual([]);
  });
  it("sets the case type", () => {
    const { dispatch } = testStore;
    dispatch(setSnoozeState("SNOOZED"));
    expect(testStore.getState().caseFilters.snoozeState).toBe("SNOOZED");
  });
  it("toggles case details", () => {
    const { dispatch } = testStore;
    dispatch(clearCases());
    dispatch(addCases(initialCases));
    dispatch(addCases(newCases));
    dispatch(toggleDetails("ABC123"));
    const expected = [...initialCases, ...newCases].map(c => {
      if (c.receiptNumber === "ABC123") {
        c.showDetails = !c.showDetails;
      }
      return c;
    });
    expect(testStore.getState().cases.caselist).toEqual(expected);
  });
  it("sets cases loading state", () => {
    const { dispatch } = testStore;
    dispatch(setIsLoading(true));
    expect(testStore.getState().cases.isLoading).toBe(true);
    dispatch(setIsLoading(false));
    expect(testStore.getState().cases.isLoading).toBe(false);
  });
  it("asynchronously loads cases", async () => {
    const testAsyncStore = store;
    jest.spyOn(testAsyncStore, "dispatch");
    jest.spyOn(global as any, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => initialCases
      })
    );
    const { dispatch, getState } = testAsyncStore;
    dispatch(setSnoozeState("ACTIVE"));
    await loadCases()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(addCases(initialCases));
  });
  it("calls getCases without a receiptNumber when there are no cases", async () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    const { dispatch, getState } = store;
    const summary: Summary = {
      CASES_TO_WORK: 15,
      SNOOZED_CASES: 5,
      PREVIOUSLY_SNOOZED: 2
    };
    dispatch(setCaseSummary(summary));
    dispatch(clearCases());
    dispatch(setSnoozeState("ACTIVE"));
    await loadCases()(dispatch, getState);
    expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
      "ACTIVE",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  });
  it("calls getCases with a receiptNumber when there is a case", async () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    const { dispatch, getState } = store;
    const summary: Summary = {
      CASES_TO_WORK: 15,
      SNOOZED_CASES: 5,
      PREVIOUSLY_SNOOZED: 2
    };
    dispatch(setCaseSummary(summary));
    dispatch(clearCases());
    dispatch(addCases(initialCases));
    dispatch(setSnoozeState("ACTIVE"));
    await loadCases()(dispatch, getState);
    expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
      "ACTIVE",
      initialCases[initialCases.length - 1].receiptNumber,
      undefined,
      undefined,
      undefined,
      undefined
    );
  });
  it("calls getCases with a snooze reason when there is a case", async () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    const { dispatch, getState } = store;
    const summary: Summary = {
      CASES_TO_WORK: 15,
      SNOOZED_CASES: 5,
      PREVIOUSLY_SNOOZED: 2
    };
    dispatch(setCaseSummary(summary));
    dispatch(clearCases());
    dispatch(addCases(initialCases));
    dispatch(setSnoozeReasonFilter("test_data"));

    dispatch(setSnoozeState("SNOOZED"));
    await loadCases()(dispatch, getState);
    expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
      "SNOOZED",
      initialCases[initialCases.length - 1].receiptNumber,
      undefined,
      undefined,
      "test_data",
      undefined
    );
  });
  it("calls getCases without a receiptNumber and with a date filter", async () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    const { dispatch, getState } = store;
    const summary: Summary = {
      CASES_TO_WORK: 15,
      SNOOZED_CASES: 5,
      PREVIOUSLY_SNOOZED: 2
    };
    dispatch(setCaseSummary(summary));
    dispatch(clearCases());
    dispatch(setCaseCreationStart(new Date("1/1/2018")));
    dispatch(setCaseCreationEnd(new Date("1/1/2019")));
    dispatch(setSnoozeState("ACTIVE"));
    await loadCases()(dispatch, getState);
    expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
      "ACTIVE",
      undefined,
      new Date("1/1/2018"),
      new Date("1/1/2019"),
      undefined,
      undefined
    );
  });
  it("calls getCases with a receiptNumber and with a date filter", async () => {
    jest.spyOn(RestAPIClient.cases, "getCases");
    const { dispatch, getState } = store;
    const summary: Summary = {
      CASES_TO_WORK: 15,
      SNOOZED_CASES: 5,
      PREVIOUSLY_SNOOZED: 2
    };
    dispatch(setCaseSummary(summary));
    dispatch(clearCases());
    dispatch(addCases(initialCases));
    dispatch(setCaseCreationStart(new Date("1/1/2018")));
    dispatch(setCaseCreationEnd(new Date("1/1/2019")));
    dispatch(setSnoozeState("ACTIVE"));
    await loadCases()(dispatch, getState);
    expect(RestAPIClient.cases.getCases).toHaveBeenCalledWith(
      "ACTIVE",
      initialCases[initialCases.length - 1].receiptNumber,
      new Date("1/1/2018"),
      new Date("1/1/2019"),
      undefined,
      undefined
    );
  });
  it("sets the case summary", () => {
    const { dispatch } = testStore;
    const summary: Summary = {
      CASES_TO_WORK: 15,
      SNOOZED_CASES: 5,
      PREVIOUSLY_SNOOZED: 2
    };
    dispatch(setCaseSummary(summary));
    expect(testStore.getState().cases.summary).toBe(summary);
  });
  it("sets last updated", () => {
    const { dispatch } = testStore;
    dispatch(setLastUpdated("January 20, 2019"));
    expect(testStore.getState().cases.lastUpdated).toBe("January 20, 2019");
  });
  it("sets case creation start", () => {
    const { dispatch } = testStore;
    dispatch(setCaseCreationStart(new Date("1/20/2019")));
    expect(
      (testStore.getState().caseFilters
        .caseCreationStart as Date).toLocaleDateString()
    ).toBe("1/20/2019");
  });
  it("sets case creation end", () => {
    const { dispatch } = testStore;
    dispatch(setCaseCreationEnd(new Date("1/20/2019")));
    expect(
      (testStore.getState().caseFilters
        .caseCreationEnd as Date).toLocaleDateString()
    ).toBe("1/20/2019");
  });
  it("sets snooze reason filter", () => {
    const { dispatch } = testStore;
    dispatch(setSnoozeReasonFilter("test_data"));
    expect(testStore.getState().caseFilters.snoozeReasonFilter).toBe(
      "test_data"
    );
  });
  it("asynchronously loads case summary", async () => {
    const testAsyncStore = store;
    const expected: Summary = {
      CASES_TO_WORK: 7,
      SNOOZED_CASES: 15,
      PREVIOUSLY_SNOOZED: 5
    };
    const response = {
      CURRENTLY_SNOOZED: 15,
      NEVER_SNOOZED: 2,
      PREVIOUSLY_SNOOZED: 5
    };

    jest.spyOn(testAsyncStore, "dispatch");
    jest.spyOn(global as any, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => response
      })
    );
    const { dispatch } = testAsyncStore;
    await getCaseSummary()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(setCaseSummary(expected));
  });
  it("sets hasMoreCases to true if there is an extra case on the response", async () => {
    const testAsyncStore = createTestStore();
    const sampleCase: Case = initialCases[0];
    const response = new Array(RESULTS_PER_PAGE + 1).fill(sampleCase);
    jest.spyOn(testAsyncStore, "dispatch");
    jest.spyOn(global as any, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => response
      })
    );
    const { dispatch, getState } = testAsyncStore;
    await loadCases()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setHasMoreCases(true));
  });
  it("sets hasMoreCases to false if the response is equal to resultsPerPage", async () => {
    const testAsyncStore = createTestStore();
    const sampleCase: Case = initialCases[0];
    const response = new Array(RESULTS_PER_PAGE).fill(sampleCase);
    jest.spyOn(testAsyncStore, "dispatch");
    jest.spyOn(global as any, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => response
      })
    );
    const { dispatch, getState } = testAsyncStore;
    await loadCases()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setHasMoreCases(false));
  });
  it("sets hasMoreCases to false if the response is less than resultsPerPage", async () => {
    const testAsyncStore = createTestStore();
    const sampleCase: Case = initialCases[0];
    const response = new Array(RESULTS_PER_PAGE - 1).fill(sampleCase);
    jest.spyOn(testAsyncStore, "dispatch");
    jest.spyOn(global as any, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => response
      })
    );
    const { dispatch, getState } = testAsyncStore;
    await loadCases()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setHasMoreCases(false));
  });
});
