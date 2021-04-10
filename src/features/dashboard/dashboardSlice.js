import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  loading: false,
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
        state.loading = true;
      })
      .addCase(makeAPICall.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
