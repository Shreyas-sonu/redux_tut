// for rtk 1 counter
const {
  createAction,
  createReducer,
  nanoid,
  configureStore,
} = require("@reduxjs/toolkit");
const logger=require('redux-logger').createLogger()
//initial state
const countState = { count: 0 };
//create action
const increment = createAction("INC");
const incrementX = createAction("INC-X", (amount, user) => {
  return { payload: { amount, user, id: nanoid() } };
});
const decrement = createAction("DEC");
const reset = createAction("RES");
// console.log(increment);
// console.log(increment(20));
// console.log(incrementX(2, "Emma"));
//create reducer
//a. using builder callback notation
const counterSlice1 = createReducer(countState, builder => {
  builder.addCase(increment, state => {
    state.count += 1;
  });
  builder.addCase(decrement, state => {
    state.count -= 1;
  });
  builder.addCase(reset, state => {
    state.count = 0;
  });
  builder.addCase(incrementX, (state, action) => {
    state.count += action.payload.amount;
  });
});
//b. using map object notation?
// const counterSlice2 = createReducer(countState, {
//   [increment]: state => {
//     state.count += 1;
//   },
//   [decrement]: state => {
//     state.count -= 1;
//   },
//   [reset]: state => {
//     state.count = 0;
//   },
//   [incrementX]: (state, action) => {
//     state.count += action.payload.amount;
//   },
// });

//store
const store = configureStore({
  reducer: counterSlice1,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
//dispatch action
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementX(40,'Renjon'));
store.dispatch(increment());
console.log(store.getState());
