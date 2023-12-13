import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Slices/AccountSlice";
import customerReducer from "./Slices/CustomerSlice";

//Combining Multiple Reducers into a rootReducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// create a store to disptach actions
// Tell the store to use "thunk" middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
