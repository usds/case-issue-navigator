import { getHeaders } from "../getHeaders";

describe("getHeaders", () => {
  it("should return an empty header set when no headers are provided", () => {
    const allHeaders = [];
    const view = "Cases to Work";
    expect(getHeaders(allHeaders, view)).toEqual([]);
  });

  it("should return all headers when all headers match view", () => {
    const view = "SOME_VIEW";
    const allHeaders = [
      {
        someProp: "exampleData",
        views: [view]
      },
      {
        someProp: "otherExampleData",
        views: [view]
      }
    ];
    expect(getHeaders(allHeaders, view)).toEqual(allHeaders);
  });

  it("should return no headers when no headers match view", () => {
    const view = "SOME_VIEW";
    const otherView = "OTHER_VIEW";
    const allHeaders = [
      {
        someProp: "exampleData",
        views: [otherView]
      },
      {
        someProp: "otherExampleData",
        views: [otherView]
      }
    ];
    expect(getHeaders(allHeaders, view)).toEqual([]);
  });

  it("should return a subset of headers when only a subset matches", () => {
    const view = "SOME_VIEW";
    const otherView = "OTHER_VIEW";
    const allHeaders = [
      {
        someProp: "exampleData",
        views: [otherView]
      },
      {
        someProp: "otherExampleData",
        views: [view]
      }
    ];
    const expectedResult = [
      {
        someProp: "otherExampleData",
        views: [view]
      }
    ];
    expect(getHeaders(allHeaders, view)).toEqual(expectedResult);
  });
});
