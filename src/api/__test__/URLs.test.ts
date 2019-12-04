import ClientBase from "../ClientBase";
import URLs from "../URLs";

const TEST_URL = "http://localhost:8080";

function expectURLEquals(url: URL, path: string) {
  expect(url.toString()).toMatch(TEST_URL + path);
}

describe("URLs", () => {
  it("should producte the correct csrf path", () => {
    expectURLEquals(URLs.csrf(), "/csrf");
  });

  it("should producte the correct users path", () => {
    expectURLEquals(URLs.users(), "/api/users");
  });

  it("should producte the correct cases summary path", () => {
    expectURLEquals(URLs.casesSummary(), "/api/cases/DEFAULT/STANDARD/summary");
  });

  it("should producte the correct active cases path", () => {
    expectURLEquals(
      URLs.cases("ACTIVE", "ABC1234567890"),
      "/api/cases/DEFAULT/STANDARD?mainFilter=ACTIVE&size=20&pageReference=ABC1234567890"
    );
  });

  it("should producte the correct snooze cases path", () => {
    expectURLEquals(
      URLs.cases("SNOOZED", "ABC1234567890"),
      "/api/cases/DEFAULT/STANDARD?mainFilter=SNOOZED&size=20&pageReference=ABC1234567890"
    );
  });

  it("should producte the correct snooze cases path with range", () => {
    expectURLEquals(
      URLs.cases(
        "SNOOZED",
        undefined,
        new Date("2/4/2018"),
        new Date("3/5/2019")
      ),
      "/api/cases/DEFAULT/STANDARD?mainFilter=SNOOZED&size=20&caseCreationRangeBegin=2018-02-04T05%3A00%3A00.000Z&caseCreationRangeEnd=2019-03-05T05%3A00%3A00.000Z"
    );
  });

  it("should producte the correct snooze cases path with snooze reason", () => {
    expectURLEquals(
      URLs.cases("SNOOZED", undefined, undefined, undefined, "test_data"),
      "/api/cases/DEFAULT/STANDARD?mainFilter=SNOOZED&size=20&snoozeReason=test_data"
    );
  });

  it("should producte the correct case details path", () => {
    expectURLEquals(URLs.caseDetails("123"), "/api/caseDetails/DEFAULT/123");
  });

  it("should producte the correct case details active snooze path", () => {
    expectURLEquals(
      URLs.caseDetailsActiveSnooze("123"),
      "/api/caseDetails/DEFAULT/123/activeSnooze"
    );
  });
});
