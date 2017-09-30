import {
  selectPixelsPerUnit,
  selectUnitsToPixelString,
  selectUnitsToMinutes,
  selectUnitsToPixels,
  selectPixelsToUnits
} from "./ConfigSelectors";

describe("selectPixelsPerUnit", () => {
  it("should the pixelsPerUnit config property", () => {
    const state = { config: { pixelsPerUnit: 10 } };
    expect(selectPixelsPerUnit(state)).toEqual(10);
  });
});

describe("selectUnitsToMinutes", () => {
  it("should return a function that converts units to minutes", () => {
    const state = { config: { minutesPerUnit: 10 } };
    expect(selectUnitsToMinutes(state)(2)).toEqual(20);
  });
});

describe("selectUnitsToPixelString", () => {
  it("should return a function that converts units to pixels with the px suffix", () => {
    const state = { config: { pixelsPerUnit: 10 } };
    expect(selectUnitsToPixelString(state)(2)).toEqual("20px");
  });
});

describe("selectUnitsToPixels", () => {
  it("should return a function that converts units to pixels", () => {
    const state = { config: { pixelsPerUnit: 10 } };
    expect(selectUnitsToPixels(state)(2)).toEqual(20);
  });
});

describe("selectPixelsToUnits", () => {
  it("should return a function that converts pixels to units", () => {
    const state = { config: { pixelsPerUnit: 10 } };
    expect(selectPixelsToUnits(state)(20)).toEqual(2);
  });

  it("should round to the nearest unit", () => {
    const state = { config: { pixelsPerUnit: 10 } };
    expect(selectPixelsToUnits(state)(25)).toEqual(3);
  });
});
