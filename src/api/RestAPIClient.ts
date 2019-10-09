import CaseIssueAPIClient from "./resources/CaseIssueAPIClient";
import AuthAPIClient from "./resources/AuthAPIClient";
import CaseDetailsAPIClient from "./resources/CaseDetailsAPIClient";

class RestAPIClient {
  private static casesClient: CaseIssueAPIClient;
  private static authClient: AuthAPIClient;
  private static caseDetialsClient: CaseDetailsAPIClient;

  public static get cases() {
    if (!RestAPIClient.casesClient) {
      RestAPIClient.casesClient = new CaseIssueAPIClient();
    }
    return RestAPIClient.casesClient;
  }

  public static get caseDetails() {
    if (!RestAPIClient.caseDetialsClient) {
      RestAPIClient.caseDetialsClient = new CaseDetailsAPIClient();
    }
    return RestAPIClient.caseDetialsClient;
  }

  public static get auth() {
    if (!RestAPIClient.authClient) {
      RestAPIClient.authClient = new AuthAPIClient();
    }
    return RestAPIClient.authClient;
  }
}

export default RestAPIClient;
