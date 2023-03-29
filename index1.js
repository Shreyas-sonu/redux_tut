// example 2 cakes and ice creams use case for multiple reducer
const redux = require("redux");

//! 1 Action
const ORDER_CAKE = "ORDER_CAKE";
const ORDER_ICE = "ORDER_ICE";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const RESTOCK_ICE = "RESTOCK_ICE";

//! 2 Action Creator

const orderCake = () => {
    return {
        type:ORDER_CAKE
    }
}
const orderIce = () => {
  return {
    type: ORDER_ICE,
  };
};
const restockCake=(qty=1) => {
    return {
        type: RESTOCK_CAKE,
        payload:qty
    }
}
const restockIce = (qty = 1) => {
  return {
    type: RESTOCK_ICE,
    payload: qty,
  };
};
//! 3 Create Initial State
const initialState = {
    numberOfCake:10,
    numberOfIce:10
}
//! 4 Initialize Reducer
const reducer = (state=initialState,action) => {
    switch (action.type) {
      case ORDER_CAKE:
        return {
          ...state,
          numberOfCake: state.numberOfCake - 1,
        };
      case ORDER_ICE:
        return {
          ...state,
          numberOfIce: state.numberOfIce - 1,
        };
      case RESTOCK_CAKE:
        return {
          ...state,
          numberOfCake: state.numberOfCake + action.payload,
        };
      case RESTOCK_ICE:
        return {
          ...state,
          numberOfIce: state.numberOfIce + action.payload,
        };
    }
}
//! 5 iNITIALIZING THE STORE

const createStore = redux.legacy_createStore;

const store = createStore(reducer);

//! 7 Combining action creator (Binder)
const actionBinder = redux.bindActionCreators;
const actions = actionBinder({orderCake,orderIce,restockCake,restockIce},store.dispatch)
//! 6 Subscribing to created store
const unsubscribe = store.subscribe(() => console.log("updated_state", store.getState()))
//! 8 dispatching action through normal dispatch
store.dispatch(orderCake())
//! 9 dispatching action through binder
actions.orderIce()
actions.orderIce()
actions.orderIce()
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(30)
actions.restockIce(22)
//! unsubscribing to store
unsubscribe()

//? Conclusion

//? here in each console statement only one product qty change at a time and other remains unchanged to over come this issue we require combined reducer 