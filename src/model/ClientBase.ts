import { FetchClient } from "tbest-fetch-client";
import { API_BASE_URL } from "../controller/config";

type CaseManagementSystem = "DEFAULT";
type CaseType = "STANDARD";

class ClientBase extends FetchClient {
  protected resultsPerPage: number = 20;
  protected caseManagementSystem: CaseManagementSystem = "DEFAULT";
  protected caseType: CaseType = "STANDARD";

  protected static createApiUrl(endpoint: string) {
    return new URL(endpoint, API_BASE_URL);
  }

  constructor() {
    super();
    this.credentials = "include";
  }
}

export default ClientBase;
