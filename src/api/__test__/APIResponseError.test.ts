import { APIResponseError } from "../APIResponseError";
import { store } from "../../redux/create";
import { appStatusActionCreators } from "../../redux/modules/appStatus";
import { rootActionCreators } from "../../redux/modules/root";

describe("ErrorHandler", () => {
  const consoleError = console.error;
  const { setDataLoadError, setNotification } = appStatusActionCreators;
  jest.spyOn(store, "dispatch");

  beforeEach(() => {
    store.dispatch(setDataLoadError(null));
    (store.dispatch as jest.Mock).mockClear();
  });

  it("should set an access notification on 403 error", () => {
    new APIResponseError({ status: 403 } as Response);
    expect(store.dispatch).toBeCalledWith(
      setNotification({
        type: "error",
        message: "You do not have access to this system."
      })
    );
  });
  it("should clear the user's login on 401 error", () => {
    new APIResponseError({ status: 401 } as Response);
    expect(store.dispatch).toBeCalledWith(rootActionCreators.userLogout());
  });
  it("should console.error any other errors", () => {
    console.error = jest.fn();

    new APIResponseError({
      status: 500,
      body: null
    } as Response);
    expect(console.error).toBeCalledWith(500, null);

    console.error = consoleError;
  });
});
