import {
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
} from "./TimelineContainer";
import {
  SET_TIME_BOUNDS_PARAM,
  SELECT_TIME_BOUNDS_PARAM
} from "../TimeBounds/TimeBoundsActions";

describe("mapStateToProps", () => {
  it("should map out a toMinutes function'", () => {
    expect(
      mapStateToProps({ config: { minutesPerUnit: 2 }, timeBounds: {} })
        .toMinutes
    ).toBeDefined();
  });

  it("should map out the config property 'pixelsPerUnit'", () => {
    expect(
      mapStateToProps({ config: { pixelsPerUnit: 2 }, timeBounds: {} })
        .pixelsPerUnit
    ).toEqual(2);
  });

  it("should map out the timeBounds", () => {
    expect(
      mapStateToProps({ config: {}, timeBounds: { editing: false } }).timeBounds
    ).toEqual({ editing: false });
  });
});

describe("mapDispatchToProps", () => {
  it("should bind a 'SET_TIME_BOUNDS_PARAM' action creator", () => {
    const dispatch = action => ({ action });
    expect(
      mapDispatchToProps(dispatch).setTimeBoundsParam(1).action.type
    ).toEqual(SET_TIME_BOUNDS_PARAM);
  });

  it("should bind a 'SELECT_TIME_BOUNDS_PARAM' action creator", () => {
    const dispatch = action => ({ action });
    expect(
      mapDispatchToProps(dispatch).selectTimeBoundsParam().action.type
    ).toEqual(SELECT_TIME_BOUNDS_PARAM);
  });
});

describe("mergeProps", () => {
  function buildDispatchSpies() {
    return {
      setTimeBoundsParam: jest.fn(),
      selectTimeBoundsParam: jest.fn()
    };
  }

  it("should add a timeClicked function", () => {
    expect(mergeProps({}, {}, {}).timeClicked).toBeDefined();
  });

  it("should add a timeHovered function", () => {
    expect(mergeProps({}, {}, {}).timeHovered).toBeDefined();
  });

  describe("timeClicked", () => {
    describe("and does not have a min", () => {
      it("should call the 'selectTimeBoundsParam' function with 'min'", () => {
        const spies = buildDispatchSpies();
        const { timeClicked } = mergeProps({ timeBounds: {} }, spies, {});
        timeClicked();
        expect(spies.selectTimeBoundsParam.mock.calls[0]).toEqual(["min"]);
      });

      it("should call the 'setTimeBoundsParam' function", () => {
        const spies = buildDispatchSpies();
        const { timeClicked } = mergeProps({ timeBounds: {} }, spies, {});
        timeClicked();
        expect(spies.setTimeBoundsParam.mock.calls.length).toEqual(1);
      });

      describe("and does have a min", () => {
        it("should call the 'setTimeBoundsParam' function", () => {
          const spies = buildDispatchSpies();
          const { timeClicked } = mergeProps(
            { timeBounds: { min: 0 } },
            spies,
            {}
          );
          timeClicked();
          expect(spies.setTimeBoundsParam.mock.calls.length).toBe(1);
        });

        it("should call the 'selectTimeBoundsParam' function with 'max'", () => {
          const spies = buildDispatchSpies();
          const { timeClicked } = mergeProps(
            { timeBounds: { min: 0 } },
            spies,
            {}
          );
          timeClicked();
          expect(spies.selectTimeBoundsParam.mock.calls[0]).toEqual(["max"]);
        });
      });
    });
  });

  describe("timeHovered", () => {
    describe("if the timeBounds is null", () => {
      it("should not call the 'setTimeBoundsParam' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps({ timeBounds: null }, spies, {});
        timeHovered();
        expect(spies.setTimeBoundsParam.mock.calls.length).toBe(0);
      });

      it("should not call the 'selectTimeBoundsParam' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps({ timeBounds: null }, spies, {});
        timeHovered();
        expect(spies.selectTimeBoundsParam.mock.calls.length).toBe(0);
      });
    });

    describe("if the timeBounds is not null", () => {
      it("should call the 'setTimeBoundsParam' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps(
          { timeBounds: { selectedParam: "min" } },
          spies,
          {}
        );
        timeHovered();
        expect(spies.setTimeBoundsParam.mock.calls.length).toBe(1);
      });

      it("should not call the 'selectTimeBoundsParam' function", () => {
        const spies = buildDispatchSpies();
        const { timeHovered } = mergeProps(
          { timeBounds: { selectedParam: "min" } },
          spies,
          {}
        );
        timeHovered();
        expect(spies.selectTimeBoundsParam.mock.calls.length).toBe(0);
      });
    });
  });
});
