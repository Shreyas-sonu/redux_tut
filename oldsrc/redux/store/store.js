import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { postsReducer } from "../reducers/postReducer";

//combine all middleware
//redux toolkit should be added
//combine all middlewares

const middlewares = [reduxThunk];
const middlewareEnhancers = applyMiddleware(...middlewares);
const store = createStore(
  postsReducer,
  composeWithDevTools(middlewareEnhancers)
);

export default store;

// const middlewares = [reduxThunk];
// const middlewareEnhancers = applyMiddleware(...middlewares);
// const store = createStore(
//   postsReducer,
//   composeWithDevTools(middlewareEnhancers)
// );

// export default store;
