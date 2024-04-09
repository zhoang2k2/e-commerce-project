import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Slide } from "../../types/Slide";

interface HomepageState {
  slides: Slide[];
}

const initialState: HomepageState = {
  slides: [],
};

export const fetchCarouselImage = createAsyncThunk(
  "homepage/carousel/fetch",
  async () => {
    const response = await axios.get("http://localhost:3000/carouselImages");
    return response.data;
  }
);

export const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarouselImage.fulfilled, (state, action) => {
      state.slides = action.payload;
    });
  },
});

export default homepageSlice.reducer;
