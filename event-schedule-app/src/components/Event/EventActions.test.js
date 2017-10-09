import {
  selectEvent,
  deselectEvent,
  setEventVariable,
  incrementEventVariable,
  translateEvent,
  setEventName,
  SET_EVENT_VARIABLE,
  INCREMENT_EVENT_VARIABLE,
  SELECT_EVENT,
  DESELECT_EVENT,
  TRANSLATE_EVENT,
  SET_EVENT_NAME
} from "./EventActions";

describe("selectEvent", () => {
  it("should return a SELECT_EVENT action", () => {
    expect(selectEvent("a").type).toEqual(SELECT_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(selectEvent("a").eventId).toEqual("a");
  });
});

describe("deselectEvent", () => {
  it("should return a DESELECT_EVENT action", () => {
    expect(deselectEvent("a").type).toEqual(DESELECT_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(deselectEvent("a").eventId).toEqual("a");
  });
});

describe("translateEvent", () => {
  it("should return a TRANSLATE_EVENT action", () => {
    expect(translateEvent("a").type).toEqual(TRANSLATE_EVENT);
  });

  it("should return the passed-in eventId", () => {
    expect(translateEvent("a").eventId).toEqual("a");
  });

  it("should return the passed-in distanceInUnits", () => {
    expect(translateEvent("a", 10).distanceInUnits).toEqual(10);
  });
});

describe("setEventName", () => {
  it("should return a SET_EVENT_NAME action", () => {
    expect(setEventName("a").type).toEqual(SET_EVENT_NAME);
  });

  it("should return the passed-in eventId", () => {
    expect(setEventName("a").eventId).toEqual("a");
  });

  it("should return the passed-in name", () => {
    expect(setEventName("a", "bla").name).toEqual("bla");
  });
});

describe("setEventVariable", () => {
  it("should return a SET_EVENT_VARIABLE action", () => {
    expect(setEventVariable().type).toEqual(SET_EVENT_VARIABLE);
  });

  it("should return an action with the passed in eventId", () => {
    expect(setEventVariable("id", "", "", 10).eventId).toEqual("id");
  });

  it("should return an action with the passed in eventPart", () => {
    expect(setEventVariable("", "start", "", 10).eventPart).toEqual("start");
  });

  it("should return an action with the passed in rangePart", () => {
    expect(setEventVariable("", "", "min", 10).rangePart).toEqual("min");
  });

  it("should return an action with the passed in timeInUnits", () => {
    expect(setEventVariable("", "", "", 10).timeInUnits).toEqual(10);
  });
});

describe("incrementEventVariable", () => {
  it("should return a INCREMENT_EVENT_VARIABLE action", () => {
    expect(incrementEventVariable().type).toEqual(INCREMENT_EVENT_VARIABLE);
  });

  it("should return an action with the passed in eventId", () => {
    expect(incrementEventVariable("id", "", "", 10).eventId).toEqual("id");
  });

  it("should return an action with the passed in eventPart", () => {
    expect(incrementEventVariable("", "start", "", 10).eventPart).toEqual(
      "start"
    );
  });

  it("should return an action with the passed in rangePart", () => {
    expect(incrementEventVariable("", "", "min", 10).rangePart).toEqual("min");
  });

  it("should return an action with the passed in timeInUnits", () => {
    expect(incrementEventVariable("", "", "", 10).timeInUnits).toEqual(10);
  });
});
