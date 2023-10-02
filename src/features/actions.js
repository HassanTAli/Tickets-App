import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios/instance";

export const postTicket = createAsyncThunk(
  "ticket/postTicket",
  async (
    { subject, from, to, status, description, date },
    { rejectWithValue }
  ) => {
    try {
      const { data, status: code } = await instance.post("/tickets", {
        subject,
        from,
        to,
        status,
        description,
        date,
      });
      return { data, code };
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  async (id, { rejectWithValue }) => {
    try {
      const { data, status: code } = await instance.delete(`/tickets/${id}`);
      return data, code;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editTicket = createAsyncThunk(
  "ticket/editTicket",
  async ({ obj, id }, { rejectWithValue }) => {
    console.log({ obj, id });
    try {
      const { data, status: code } = await instance.patch(
        `/tickets/${id}`,
        obj
      );
      return { data, code };
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
