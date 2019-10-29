import RestAPIClient from "../RestAPIClient";
import fetchMock from "fetch-mock";
import URLs from "../URLs";

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
    fetchMock.mock(URLs.csrf().toString(), fakeCsrf);
    return RestAPIClient.cases
      .getCsrf()
      .then(() =>
        expect(
          JSON.parse(localStorage.getItem("csrf") as string)
        ).toStrictEqual(fakeCsrf)
      );
  });
  it("should not set a csrf token to localStorage if no csrf is returned from fetch", () => {
    fetchMock.mock(URLs.csrf().toString(), {});
    return RestAPIClient.cases.getCsrf().then(() => {
      const csrf = JSON.parse(localStorage.getItem("csrf") as string);
      expect(csrf.headerName).toBe(undefined);
      expect(csrf.token).toBe(undefined);
    });
  });
});
