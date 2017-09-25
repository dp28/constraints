import {
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
} from "./TimelineContainer";
import {
  START_EVENT,
  SET_EVENT_END,
  TOGGLE_EDITING_EVENT
} from "../NewEvent/NewEventActions";

describe("mapStateToProps", () => {
  it("should map out a toMinutes function'", () => {
    expect(
      mapStateToProps({ config: { minutesPerUnit: 2 }, newEvent: {} }).toMinutes
    ).toBeDefined();
  });

  it("should map out the config property 'pixelsPerUnit'", () => {
    expect(
      mapStateToProps({ config: { pixelsPerUnit: 2 }, newEvent: {} })
        .pixelsPerUnit
    ).toEqual(2);
  });

  it("should map out the newEvent", () => {
    expect(
      mapStateToProps({ config: {}, newEvent: { editing: false } }).newEvent
    ).toEqual({ editing: false });
  });
});

describe("mapDispatchToProps", () => {
  it("should bind a 'START_EVENT' action creator", () => {
    const dispatch = action => ({ action });
    expect(mapDispatchToProps(dispatch).startEvent(1).action.type).toEqual(
      START_EVENT
    );
  });

  it("should bind a 'SET_EVENT_END' action creator", () => {
    const dispatch = action => ({ action });
    expect(mapDispatchToProps(dispatch).setEventEnd(1).action.type).toEqual(
      SET_EVENT_END
    );
  });

  it("should bind a 'TOGGLE_EDITING_EVENT' action creator", () => {
    const dispatch = action => ({ action });
    expect(
      mapDispatchToProps(dispatch).toggleEditingEvent().action.type
    ).toEqual(TOGGLE_EDITING_EVENT);
  });
});

describe("mergeProps", () => {
  function buildDispatchSpies() {
    return {
      startEvent: jest.fn(),
      setEventEnd: jest.fn(),
      toggleEditingEvent: jest.fn()
    };
  }

  it("should add a timeClicked function", () => {
    expect(mergeProps({}, {}, {}).timeClicked).toBeDefined();
  });

  it("should add a timeHovered function", () => {
    expect(mergeProps({}, {}, {}).timeHovered).toBeDefined();
  });

  describe("timeClicked", () => {
    describe("if the newEvent is not being edited", () => {
      describe("and does not have a minStart", () => {
        it("should call the 'startEvent' function", () => {
          const spies = buildDispatchSpies();
          const { timeClicked } = mergeProps(
            { newEvent: { editing: false } },
            spies,
            {}
          );
          timeClicked();
          expect(spies.startEvent.mock.calls.length).toBe(1);
        });

        it("should not call the 'setEventEnd' function", () => {
          const spies = buildDispatchSpies();
          const { timeClicked } = mergeProps(
            { newEvent: { editing: false } },
            spies,
            {}
          );
          timeClicked();
          expect(spies.setEventEnd.mock.calls.length).toBe(0);
        });

        it("should call the 'toggleEditingEvent' function", () => {
          const spies = buildDispatchSpies();
          const { timeClicked } = mergeProps(
            { newEvent: { editing: false } },
            spies,
            {}
          );
          timeClicked();
          expect(spies.toggleEditingEvent.mock.calls.length).toBe(1);
        });
      });

      describe("and does have a minStart", () => {
        it("should not call the 'startEvent' function", () => {
          const spies = buildDispatchSpies();
          const { timeClicked } = mergeProps(
            { newEvent: { editing: false, minStart: 0 } },
            spies,
            {}
          );
          timeClicked();
          expect(spies.startEvent.mock.calls.length).toBe(0);
        });

        it("should call the 'setEventEnd' function", () => {
          const spies = buildDispatchSpies();
          const { timeClicked } = mergeProps(
            { newEvent: { editing: false, minStart: 0 } },
            spies,
            {}
          );
          timeClicked();
          expect(spies.setEventEnd.mock.calls.length).toBe(1);
        });

        it("should call the 'toggleEditingEvent' function", () => {
          const spies = buildDispatchSpies();
          const { timeClicked } = mergeProps(
            { newEvent: { editing: false, minStart: 0 } },
            spies,
            {}
          );
          timeClicked();
          expect(spies.toggleEditingEvent.mock.calls.length).toBe(1);
        });
      });
    });

    describe("if the newEvent is being edited", () => {
      it("should not call the 'startEvent' function", () => {
        const spies = buildDispatchSpies();
        const { timeClicked } = mergeProps(
          { newEvent: { editing: true } },
          spies,
          {}
        );
        timeClicked();
        expect(spies.startEvent.mock.calls.length).toBe(0);
      });

      it("should call the 'setEventEnd' function", () => {
        const spies = buildDispatchSpies();
        const { timeClicked } = mergeProps(
          { newEvent: { editing: true } },
          spies,
          {}
        );
        timeClicked();
        expect(spies.setEventEnd.mock.calls.length).toBe(1);
      });

      it("should call the 'toggleEditingEvent' function", () => {
        const spies = buildDispatchSpies();
        const { timeClicked } = mergeProps(
          { newEvent: { editing: true } },
          spies,
          {}
        );
        timeClicked();
        expect(spies.toggleEditingEvent.mock.calls.length).toBe(1);
      });
    });
  });

  describe("timeHovered", () => {
    describe("if the newEvent is not being edited", () => {
      it("should not call the 'startEvent' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps(
          { newEvent: { editing: false } },
          spies,
          {}
        );
        timeHovered();
        expect(spies.startEvent.mock.calls.length).toBe(0);
      });

      it("should not call the 'setEventEnd' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps(
          { newEvent: { editing: false } },
          spies,
          {}
        );
        timeHovered();
        expect(spies.setEventEnd.mock.calls.length).toBe(0);
      });

      it("should not call the 'toggleEditingEvent' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps(
          { newEvent: { editing: false } },
          spies,
          {}
        );
        timeHovered();
        expect(spies.toggleEditingEvent.mock.calls.length).toBe(0);
      });
    });

    describe("if the newEvent is being edited", () => {
      it("should not call the 'startEvent' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps(
          { newEvent: { editing: true } },
          spies,
          {}
        );
        timeHovered();
        expect(spies.startEvent.mock.calls.length).toBe(0);
      });

      it("should call the 'setEventEnd' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps(
          { newEvent: { editing: true } },
          spies,
          {}
        );
        timeHovered();
        expect(spies.setEventEnd.mock.calls.length).toBe(1);
      });

      it("should not call the 'toggleEditingEvent' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps(
          { newEvent: { editing: true } },
          spies,
          {}
        );
        timeHovered();
        expect(spies.toggleEditingEvent.mock.calls.length).toBe(0);
      });
    });
  });
});
