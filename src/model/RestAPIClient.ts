import CaseIssueAPIClient from "./CaseIssueAPIClient";

class RestAPIClient {
  private static casesClient: CaseIssueAPIClient;

  public static get cases() {
    if (!RestAPIClient.casesClient) {
      RestAPIClient.casesClient = new CaseIssueAPIClient();
    }
    return RestAPIClient.casesClient;
  }
}

export default RestAPIClient;
