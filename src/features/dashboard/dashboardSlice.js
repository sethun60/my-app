import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: {
    value: [],
    loading: false,
  },
};

export const makeAPICall = createAsyncThunk("fetch", async (url) => {
  let res = await fetch(url);
  res = await res.json();
  return res;
});

export const dashboardSlice = createSlice({
  name: "payload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeAPICall.pending, (state) => {
        state.teams.loading = true;
      })
      .addCase(makeAPICall.fulfilled, (state, action) => {
        state.teams.loading = false;
        state.teams.value = action.payload;
      });
  },
});

export const selectTeams = (state) => state.payload.teams;

export default dashboardSlice.reducer;
