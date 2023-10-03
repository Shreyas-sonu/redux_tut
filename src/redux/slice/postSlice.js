import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../utils/apiURL";

const initialState = {
  posts: [],
  loading: false,
  error: "",
};
export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const { data } = await axios.get(apiURL);
  return data;
});
const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const postReducer = postSlice.reducer;

export default postReducer;
