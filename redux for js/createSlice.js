const { createSlice, configureStore } = require("@reduxjs/toolkit");
const logger = require("redux-logger").createLogger();
// initial state
const initialState = { count: 0 };

//slice creation
const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      state.count -= 1;
    },
    reset: state => {
      state.count = 0;
    },
    incrementX: (state, action) => {
      state.count += action.payload;
    },
  },
});

//generate actions from slice
const { increment, decrement, reset, incrementX } = countSlice.actions;
const counterReducer = countSlice.reducer;
//store configuration
const store = configureStore({
  reducer: counterReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
//dispatch actions
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementX(20));
store.dispatch(reset());
store.dispatch(decrement());
store.dispatch(incrementX(10));
console.log(store.getState());
