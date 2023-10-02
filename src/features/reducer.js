import { combineReducers } from "@reduxjs/toolkit";
import ticketSlice from "./ticketSlice";

export default combineReducers({
  ticket: ticketSlice,
});
