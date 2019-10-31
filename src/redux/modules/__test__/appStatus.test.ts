import { createStore } from "redux";
import { rootReducer, Store } from "../../create";
import { appStatusActionCreators } from "../appStatus";

describe("redux - appStatus", () => {
  let testStore: Store;
  const {
    setPageTitle,
    setDataIsLoading,
    setDataLoadError
  } = appStatusActionCreators;
  beforeEach(() => {
    testStore = createStore(rootReducer);
  });
  it("sets the page title", () => {
    const { dispatch } = testStore;
    dispatch(setPageTitle("foo"));
    expect(testStore.getState().appStatus.pageTitle).toBe("foo");
  });
  it("sets data fetch isLoading", () => {
    const { dispatch } = testStore;
    dispatch(setDataIsLoading(true));
    expect(testStore.getState().appStatus.dataFetching.isLoading).toBe(true);
    dispatch(setDataIsLoading(false));
    expect(testStore.getState().appStatus.dataFetching.isLoading).toBe(false);
  });
  it("sets data fetch error", () => {
    const { dispatch } = testStore;
    const error = new Error("Oh no!");
    dispatch(setDataLoadError(error));
    expect(testStore.getState().appStatus.dataFetching.error).toBe(error);
    dispatch(setDataLoadError(null));
    expect(testStore.getState().appStatus.dataFetching.error).toBe(null);
  });
});
