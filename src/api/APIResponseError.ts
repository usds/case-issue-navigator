import { ApiResponseError as ClientError } from "tbest-fetch-client";
import { store } from "../redux/create";
import { appStatusActionCreators } from "../redux/modules/appStatus";
import { rootActionCreators } from "../redux/modules/root";

/**
 * Represents the error response of an API request.
 */
export class APIResponseError<T> extends ClientError<T> {
  constructor(response: Response) {
    super(response);
    if (response.status === 401) {
      store.dispatch(appStatusActionCreators.clearUser());
      store.dispatch(rootActionCreators.userLogout());
    } else if (response.status === 403) {
      store.dispatch(
        appStatusActionCreators.setNotification({
          message: "You do not have access to this system.",
          type: "error"
        })
      );
    } else {
      console.error(response.status, response.body);
    }
  }
}
