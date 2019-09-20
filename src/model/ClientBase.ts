import { FetchClient } from "tbest-fetch-client";
import { API_BASE_URL } from "../controller/config";

type CaseManagementSystem = "DEFAULT";
type CaseType = "STANDARD";

class ClientBase extends FetchClient {
  protected resultsPerPage: number = 20;
  protected caseManagementSystem: CaseManagementSystem =
    (process.env.REACT_APP_CASE_MANAGEMENT_SYSTEM as CaseManagementSystem) ||
    "DEFAULT";
  protected caseType: CaseType =
    (process.env.REACT_APP_CASE_TYPE as CaseType) || "STANDARD";

  protected static createApiUrl(endpoint: string) {
    return new URL(endpoint, API_BASE_URL);
  }

  constructor() {
    super();
    this.credentials = "include";
    this.setCsrf();
  }

  protected setCsrf() {
    if (localStorage.csrf) {
      const { headerName, token } = JSON.parse(localStorage.csrf);
      this.defaultHeaders[headerName as keyof Headers] = token;
    }
  }

  public async getCsrf() {
    const response = await this.getAsJson(ClientBase.createApiUrl("/csrf"));
    if (response.succeeded) {
      const csrf = {
        headerName: response.payload.headerName,
        token: response.payload.token
      };
      localStorage.setItem("csrf", JSON.stringify(csrf));
    }
  }
}

export default ClientBase;
