import { approximateDays } from "../approximateDays";

describe("approximateDate", () => {
  it("returns the exact number of days between two date strings", () => {
    const startDate = "July 18, 2019";
    const endDate = "July 30, 2019";
    expect(approximateDays({ startDate, endDate })).toBe(12);
  });

  it("rounds number of days up", () => {
    const startDate =
      "Fri Aug 16 2019 12:52:05 GMT-0400 (Eastern Daylight Time)";
    const endDate = "Fri Aug 16 2019 14:52:05 GMT-0400 (Eastern Daylight Time)";
    expect(approximateDays({ startDate, endDate })).toBe(1);
  });

  it("works with date object inputs", () => {
    const startDate = new Date("July 18, 2019");
    const endDate = new Date("July 30, 2019");
    expect(approximateDays({ startDate, endDate })).toBe(12);
  });
});
