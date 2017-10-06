import { mapStateToProps, mapDispatchToProps } from "./Draggable";
import { startDragging, stopDragging } from "./DragActions";

describe("mapStateToProps", () => {
  const state = {
    config: { pixelsPerUnit: 5 },
    drag: { startUnits: 2, startPixels: 10 }
  };

  it("should set the axis to 'y'", () => {
    expect(mapStateToProps(state, {}).axis).toEqual("y");
  });

  it("should set the grid x to a large number to prevent useless events firing", () => {
    expect(mapStateToProps(state, {}).grid[0]).toBeGreaterThan(50);
  });

  it("should set the grid y to the pixelsPerUnit", () => {
    expect(mapStateToProps(state, {}).grid[1]).toEqual(5);
  });

  it("should set the offsetParent to the document body", () => {
    expect(mapStateToProps(state, {}).offsetParent).toEqual(
      global.document.body
    );
  });

  describe("the onDrag prop", () => {
    it("should call ownProps.onDrag with the time units moved", () => {
      let handlerArg = null;
      const mockHandler = timeUnitsMoved => {
        handlerArg = timeUnitsMoved;
      };
      const mappedProps = mapStateToProps(state, {
        onDrag: mockHandler,
        currentPositionInUnits: 10
      });
      mappedProps.onDrag({}, { y: 200, deltaY: 20 });
      expect(handlerArg).toEqual(20 / state.config.pixelsPerUnit);
    });

    it("should not call ownProps.onDrag if the movement is negative but the offset drag.y is after the current position", () => {
      let handlerCallCount = 0;
      const mockHandler = () => {
        handlerCallCount++;
      };
      const mappedProps = mapStateToProps(state, {
        onDrag: mockHandler,
        currentPositionInUnits: 10 / state.config.pixelsPerUnit
      });
      mappedProps.onDrag({}, { y: 20, deltaY: -2 });
      expect(handlerCallCount).toEqual(0);
    });

    it("should call ownProps.onDrag if the movement is negative and the offset drag.y is before the current position", () => {
      let handlerCallCount = 0;
      const mockHandler = () => {
        handlerCallCount++;
      };
      const mappedProps = mapStateToProps(state, {
        onDrag: mockHandler,
        currentPositionInUnits: 10 / state.config.pixelsPerUnit
      });
      mappedProps.onDrag({}, { y: 5, deltaY: -2 });
      expect(handlerCallCount).toEqual(1);
    });

    it("should not call ownProps.onDrag if the movement is positive but the offset drag.y is before the current position", () => {
      let handlerCallCount = 0;
      const mockHandler = () => {
        handlerCallCount++;
      };
      const mappedProps = mapStateToProps(state, {
        onDrag: mockHandler,
        currentPositionInUnits: 10 / state.config.pixelsPerUnit
      });
      mappedProps.onDrag({}, { y: 5, deltaY: 2 });
      expect(handlerCallCount).toEqual(0);
    });

    it("should call ownProps.onDrag if the movement is positive and the offset drag.y is after the current position", () => {
      let handlerCallCount = 0;
      const mockHandler = () => {
        handlerCallCount++;
      };
      const mappedProps = mapStateToProps(state, {
        onDrag: mockHandler,
        currentPositionInUnits: 10 / state.config.pixelsPerUnit
      });
      mappedProps.onDrag({}, { y: 15, deltaY: 2 });
      expect(handlerCallCount).toEqual(1);
    });
  });
});

describe("mapDispatchToProps", () => {
  it("should add an onStart handler that dispatches a startDragging action with the correct pixels & units", () => {
    let dispatchArg = null;
    const dispatch = arg => {
      dispatchArg = arg;
    };
    mapDispatchToProps(dispatch, { currentPositionInUnits: 5 }).onStart(
      {},
      { y: 10 }
    );
    expect(dispatchArg).toEqual(startDragging(10, 5));
  });

  it("should add an onStop handler that dispatches a stopDragging action", () => {
    let dispatchArg = null;
    const dispatch = arg => {
      dispatchArg = arg;
    };
    mapDispatchToProps(dispatch, {}).onStop();
    expect(dispatchArg).toEqual(stopDragging());
  });
});
