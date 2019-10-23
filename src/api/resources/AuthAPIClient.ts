import ClientBase from "../ClientBase";
import URLs from "../URLs";

class AuthAPIClient extends ClientBase {
  public async getCurrentUser() {
    return await this.getAsJson(URLs.users());
  }
}

export default AuthAPIClient;
