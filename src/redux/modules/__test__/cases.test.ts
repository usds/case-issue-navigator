import { createStore } from "redux";
import { rootReducer, Store, store } from "../../create";
import { casesActionCreators, loadCases } from "../cases";

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

describe("redux - cases", () => {
  let testStore: Store;
  const {
    addCases,
    setCases,
    removeCase,
    clearCases,
    setCaseType,
    toggleDetails,
    setIsLoading
  } = casesActionCreators;
  beforeEach(() => {
    testStore = createStore(rootReducer);
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
    dispatch(setCases(initialCases));
    expect(testStore.getState().cases.caselist).toEqual(initialCases);
    dispatch(setCases(newCases));
    expect(testStore.getState().cases.caselist).toEqual(newCases);
  });
  it("removes a case", () => {
    const { dispatch } = testStore;
    dispatch(setCases(initialCases));
    dispatch(removeCase("ABC123"));
    expect(testStore.getState().cases.caselist).toEqual([]);
  });
  it("clears all cases", () => {
    const { dispatch } = testStore;
    dispatch(setCases(initialCases));
    dispatch(addCases(newCases));
    dispatch(clearCases());
    expect(testStore.getState().cases.caselist).toEqual([]);
  });
  it("sets the case type", () => {
    const { dispatch } = testStore;
    dispatch(setCaseType("snoozed"));
    expect(testStore.getState().cases.type).toBe("snoozed");
  });
  it("toggles case details", () => {
    const { dispatch } = testStore;
    dispatch(setCases(initialCases));
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
    const { dispatch } = testAsyncStore;
    await loadCases("active")(dispatch);
    expect(dispatch).toHaveBeenCalledWith(addCases(initialCases));
  });
});
