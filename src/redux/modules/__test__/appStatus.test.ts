import { createStore } from "redux";
import { rootReducer, Store } from "../../create";
import { appStatusActionCreators } from "../appStatus";

describe("redux - appStatus", () => {
  let testStore: Store;
  const {
    setPageTitle,
    setDataIsLoading,
    setDataLoadError,
    setNotification,
    setUser,
    clearUser,
    setIsInitializing
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
    const error: APIError = {
      error: "",
      message: "",
      status: 500,
      timestamp: ""
    };
    dispatch(setDataLoadError(error));
    expect(testStore.getState().appStatus.dataFetching.error).toBe(error);
    dispatch(setDataLoadError(null));
    expect(testStore.getState().appStatus.dataFetching.error).toBe(null);
  });
  it("sets a notification", () => {
    const { dispatch } = testStore;
    const notification: AppNotification = {
      type: "info",
      message: "this is a message"
    };
    dispatch(setNotification(notification));
    expect(testStore.getState().appStatus.notification).toBe(notification);
  });
  it("sets a user", () => {
    const { dispatch } = testStore;
    const user = "John Doe";
    dispatch(setUser(user));
    expect(testStore.getState().appStatus.user).toBe(user);
  });
  it("clears a user", () => {
    const { dispatch } = testStore;
    const user = "John Doe";
    dispatch(setUser(user));
    dispatch(clearUser());
    expect(testStore.getState().appStatus.user).toBe(undefined);
  });
  it("sets initialization status", () => {
    const { dispatch } = testStore;
    dispatch(setIsInitializing(false));
    expect(testStore.getState().appStatus.isInitializing).toBe(false);
    dispatch(setIsInitializing(true));
    expect(testStore.getState().appStatus.isInitializing).toBe(true);
  });
});
