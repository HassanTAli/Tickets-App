import { createSlice } from "@reduxjs/toolkit";
import { postTicket } from "./actions";

const initialState = {
  loading: false,
  ticketInfo: [],
  errorMsg: null,
  success: false,
  ticketCount: 0,
  allTickets: [],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      console.log({ payload });
      state.allTickets = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTicket.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ticketInfo = payload.data;
        state.success = true;
      })
      .addCase(postTicket.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setCredentials } = ticketSlice.actions;
export default ticketSlice.reducer;
