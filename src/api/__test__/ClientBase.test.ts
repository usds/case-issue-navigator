import ClientBase from "../ClientBase";
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
    const clientBase = new ClientBase();
    fetchMock.mock(URLs.csrf().toString(), fakeCsrf);
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
    fetchMock.mock(URLs.csrf().toString(), {});
    return clientBase.getCsrf().then(() => {
      const csrf = JSON.parse(localStorage.getItem("csrf") as string);
      expect(csrf.headerName).toBe(undefined);
      expect(csrf.token).toBe(undefined);
    });
  });
});
