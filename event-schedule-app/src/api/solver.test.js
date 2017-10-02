import { solve } from "./solver";

describe("solve", () => {
  function mockFetch(responseJson = {}) {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseJson)
      })
    );
  }

  it("should post the passed in events to /events", () => {
    mockFetch();
    solve({ events: [] });
    expect(global.fetch.mock.calls[0][0]).toEqual("/events");
  });

  it("should use the POST method", () => {
    mockFetch();
    solve({ events: [] });
    expect(global.fetch.mock.calls[0][1].method).toEqual("POST");
  });

  it("should add a JSON content header", () => {
    mockFetch();
    solve({ events: [] });
    expect(global.fetch.mock.calls[0][1].headers["Content-Type"]).toEqual(
      "application/json"
    );
  });

  it("should add the stringified arguments as the body", () => {
    mockFetch();
    solve({ events: [] });
    expect(global.fetch.mock.calls[0][1].body).toEqual('{"events":[]}');
  });

  it("should return a Promise for the parsed JSON response", () => {
    mockFetch({ success: true });
    return solve({ events: [] }).then(response =>
      expect(response).toEqual({ success: true })
    );
  });
});
