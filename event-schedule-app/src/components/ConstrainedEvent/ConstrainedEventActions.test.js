import {
  focusEvent,
  blurEvent,
  FOCUS_EVENT,
  BLUR_EVENT
} from "./ConstrainedEventActions";

describe("focusEvent", () => {
  it("should return a FOCUS_EVENT action", () => {
    expect(focusEvent("a").type).toEqual(FOCUS_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(focusEvent("a").eventId).toEqual("a");
  });
});

describe("blurEvent", () => {
  it("should return a BLUR_EVENT action", () => {
    expect(blurEvent("a").type).toEqual(BLUR_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(blurEvent("a").eventId).toEqual("a");
  });
});
