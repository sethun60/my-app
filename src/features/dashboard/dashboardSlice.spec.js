import dashboardReducer from "../dashboard/dashboardSlice";

describe("counter reducer", () => {
  it("should handle initial state", () => {
    expect(dashboardReducer(undefined, { type: "unknown" })).toEqual({
      teams: {
        value: [],
        loading: false,
      },
    });
  });
});
