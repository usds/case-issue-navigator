import ClientBase from "../ClientBase";
import fetchMock from "fetch-mock";
import { API_BASE_URL } from "../../controller/config";

const createApiUrl = (endpoint: string) => {
  return API_BASE_URL + endpoint;
};

describe("ClientBase", () => {
  beforeEach(() => {
    fetchMock.restore();
    localStorage.clear();
  });
  const fakeCsrf = {
    headerName: "csrf-header",
    token: "abcd"
  };
  it("should set a csrf token response to localStorage", () => {
    const clientBase = new ClientBase();
    fetchMock.mock(createApiUrl("/csrf"), fakeCsrf);
    return clientBase
      .getCsrf()
      .then(() =>
        expect(
          JSON.parse(localStorage.getItem("csrf") as string)
        ).toStrictEqual(fakeCsrf)
      );
  });
  it("should not set a csrf token to localStorage if no csrf is returned from fetch", () => {
    const clientBase = new ClientBase();
    fetchMock.mock(createApiUrl("/csrf"), {});
    return clientBase.getCsrf().then(() => {
      const csrf = JSON.parse(localStorage.getItem("csrf") as string);
      expect(csrf.headerName).toBe(undefined);
      expect(csrf.token).toBe(undefined);
    });
  });
});
