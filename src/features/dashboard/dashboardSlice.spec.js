import dashboardReducer, { makeAPICall } from "../dashboard/dashboardSlice";

describe("counter reducer", () => {
  const initialState = {
    value: 3,
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(dashboardReducer(undefined, { type: "unknown" })).toEqual({
      teams: {
        value: [],
        loading: false,
      },
    });
  });
});
