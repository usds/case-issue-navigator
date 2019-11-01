import { createStore } from "redux";
import { rootReducer, Store } from "../../create";
import { casesActionCreators } from "../cases";

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
  const { addCases, setCases } = casesActionCreators;
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
});
