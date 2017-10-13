import { save, load } from "./localStorageRepository";

afterEach(() => localStorage.clear());

describe("save", () => {
  it("should serialize the passed-in state into localStorage", () => {
    save({ bla: 1 });
    expect(localStorage.__STORE__.state).toEqual(`{"bla":1}`);
  });
});

describe("load", () => {
  describe("when nothing is saved", () => {
    it("should return null", () => {
      expect(load()).toEqual(null);
    });
  });

  describe("when a state object is saved", () => {
    it("should be returned", () => {
      save({ bla: 2 });
      expect(load()).toEqual({ bla: 2 });
    });
  });
});
