import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../utils/apiURL";

const initialState = {
  posts: [],
  loading: false,
  error: "",
};
export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(apiURL);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
export const searchPosts = createAsyncThunk(
  "posts/search",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${apiURL}/${payload}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
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
      state.posts = [];
    });
    builder.addCase(searchPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchPosts.fulfilled, (state, action) => {
      state.posts = [action.payload];
      state.loading = false;
    });
    builder.addCase(searchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.posts = [];
    });
  },
});

const postReducer = postSlice.reducer;

export default postReducer;
