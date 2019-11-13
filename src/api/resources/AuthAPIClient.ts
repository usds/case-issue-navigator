import { FetchClient as c } from "tbest-fetch-client";
import ClientBase from "../ClientBase";
import URLs from "../URLs";

class AuthAPIClient extends ClientBase {
  public async getCurrentUser(): Promise<
    c.ApiResponse<UserInformation, APIError>
  > {
    return (await this.getAsJson(URLs.users())) as any;
  }
}

export default AuthAPIClient;
