import CaseIssueAPIClient from "./CaseIssueAPIClient";
import AuthAPIClient from "./AuthAPIClient";

class RestAPIClient {
  private static casesClient: CaseIssueAPIClient;
  private static authClient: AuthAPIClient;

  public static get cases() {
    if (!RestAPIClient.casesClient) {
      RestAPIClient.casesClient = new CaseIssueAPIClient();
    }
    return RestAPIClient.casesClient;
  }

  public static get auth() {
    if (!RestAPIClient.authClient) {
      RestAPIClient.authClient = new AuthAPIClient();
    }
    return RestAPIClient.authClient;
  }
}

export default RestAPIClient;
