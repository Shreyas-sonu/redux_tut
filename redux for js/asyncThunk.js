const {
  createAsyncThunk,
  createSlice,
  configureStore,
} = require("@reduxjs/toolkit");
const axios = require("axios");
const initialState = { post: [], error: null, loading: false };
const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return data;
});
const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: builder => {
    //! handling lifecycle methods like pending fulfilled and rejected state
    //pending
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });
    // rejected
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.post = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});
//generate reducer
const postReducer = postSlice.reducer;
//store
const store = configureStore({ reducer: postReducer });
//Action dispatching
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchPosts());
