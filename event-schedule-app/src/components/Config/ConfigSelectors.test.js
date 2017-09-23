import { selectUnitConverters } from "./ConfigSelectors";

describe("selectUnitConverters", () => {
  it("should return a function that converts units to minutes", () => {
    const state = { config: { minutesPerUnit: 10 } };
    const { toMinutes } = selectUnitConverters(state);
    expect(toMinutes(2)).toEqual(20);
  });

  it("should return a function that converts units to pixels", () => {
    const state = { config: { pixelsPerUnit: 10 } };
    const { pixelsPerUnit } = selectUnitConverters(state);
    expect(pixelsPerUnit).toEqual(10);
  });
});
