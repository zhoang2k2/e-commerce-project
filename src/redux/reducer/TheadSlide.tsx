import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Thead, TheadState } from "../../types/TheadType";

const initialState: TheadState = {
  TheadItems: [],
};

export const fetchThead = createAsyncThunk("tHead/fetch", async () => {
  const response = await axios.get("http://localhost:3000/TheadItems");
  return response.data as Thead[];
});

const TheadSlide = createSlice({
  name: "TheadItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchThead.fulfilled, (state, action) => {
      state.TheadItems = action.payload;
    });
  },
});

export default TheadSlide.reducer;
