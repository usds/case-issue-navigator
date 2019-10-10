import { FetchClient } from "tbest-fetch-client";
import URLs from "./URLs";


class ClientBase extends FetchClient.Client {
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
    const response = await this.getAsJson(URLs.csrf());
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
