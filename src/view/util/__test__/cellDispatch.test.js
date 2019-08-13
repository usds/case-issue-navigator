import { cellDispatch } from "../cellDispatch";

describe("cellDispatch", () => {
  describe("LINK", () => {
    it("should return a valid link with no desnoozed notification", () => {
      expect(
        cellDispatch["LINK"]("FAK123", { desnoozed: false })
      ).toMatchSnapshot();
    });
    it("should return a valid link with a desnoozed notification", () => {
      expect(
        cellDispatch["LINK"]("FAK123", { desnoozed: true })
      ).toMatchSnapshot();
    });
    it("should handle return null for invalid inputs", () => {
      expect(cellDispatch["LINK"](null, null)).toBe(null);
    });
  });

  describe("DATE", () => {
    it("should produce a well-formatted date", () => {
      const date = "July 10, 2018";
      expect(cellDispatch["DATE"](date)).toBe("7/10/2018");
    });
    it("should do something with a bad input", () => {
      expect(cellDispatch["DATE"](null)).toBe("Invalid date");
      expect(cellDispatch["DATE"]("Hello world")).toBe("Invalid date");
    });
  });
});
