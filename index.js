const redux = require("redux")
const createStore = redux.legacy_createStore;
//! action
const CAKE_ORDERED = "CAKE_ORDERED";
//! trial2 restocking
const CAKE_RESTOCK = "CAKE_RESTOCK";

// extra step action creator
const orderCake = () => {
    // the returning object is "ACTUAL ACTION" because it should be a object and the function orderCake is a extra step
return {
  type: CAKE_ORDERED,
  quantity: 1,
    }
}
//! trial2 restocking
//? here the default parameter qty=1 assigned because even when the action is dispatched without argument by default it increases the cake qty by 1
const restockCake = (qty=1) => {
  return {
    type: CAKE_RESTOCK,
      payload: qty,
    // the adding property should be always be named as payload to follow syntax
  };
};
//! State
const initialState = {
    numberOfCakes: 10,
    numberOfChocolate:20,
}
//! Reducer
// (prevState,action)=>new state
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CAKE_ORDERED:
        return {
          ...state,
          // The state is spread to keep a copy of ste to keep unchanged property of state as it is
          numberOfCakes: state.numberOfCakes - 1,
        };
      //! trial2 restocking
      case CAKE_RESTOCK:
        return {
          ...state,
          // The state is spread to keep a copy of ste to keep unchanged property of state as it is
          numberOfCakes: state.numberOfCakes +action.payload,
        };
      default:
        return state;
    }
}
// initializing or storing the state which is contained in reducer passed as argument for createStore method
const store = createStore(reducer);

// to get the store state
console.log("initial State",store.getState())

// subscribing to the changes in the store
let unSubscribe=store.subscribe(()=>console.log("updated State",store.getState()))

//? we are naming the returned function from subscribe method to unsubscribe because we can call unsubscribe to un register with app

// to dispatch an action
store.dispatch(orderCake())
//? here we are passing action creator
//? the advantage is that we can make the changes to the action at on place or else the syntax looks as follows
// store.dispatch({
//   type: CAKE_ORDERED,
//   quantity: 1,
// });
//? the above syntax is the alternate if in case we dont use action creator
store.dispatch(orderCake())
store.dispatch(orderCake())
//! trial2 restocking
store.dispatch(restockCake(4));


//! Binding action creators with store (it is not much used)
const bindActionCreator = redux.bindActionCreators;
//? this helper function accepts 2 arguments 1. all action creators in a object 2.dispatch function(for store linking)
const actions = bindActionCreator({ orderCake, restockCake }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.restockCake(10)

// unsubscribe
unSubscribe()
