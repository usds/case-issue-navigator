import { createStore } from "redux";
import { rootReducer, Store } from "../../create";
import { casesActionCreators } from "../cases";

describe("redux - cases", () => {
  let testStore: Store;
  const { addCases } = casesActionCreators;
  beforeEach(() => {
    testStore = createStore(rootReducer);
  });
  it("adds a case to an empty case list", () => {
    const cases: Case[] = [
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
    const { dispatch } = testStore;
    dispatch(addCases(cases));
    expect(testStore.getState().cases.caselist).toEqual(cases);
  });
  it("adds a case to a non-empty case list", () => {
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
    const { dispatch } = testStore;
    dispatch(addCases(initialCases));
    dispatch(addCases(newCases));
    expect(testStore.getState().cases.caselist).toEqual(
      initialCases.concat(newCases)
    );
  });
});
