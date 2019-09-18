import ClientBase from "./ClientBase";

class AuthAPIClient extends ClientBase {
  public async getCurrentUser() {
    return await this.getAsJson(AuthAPIClient.createApiUrl("/user"));
  }
}

export default AuthAPIClient;
