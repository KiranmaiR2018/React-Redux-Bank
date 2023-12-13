import { combineReducers, createStore } from "redux";

// create a Initial State object
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
//Creating new state object- Customer
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//pass the initialState as default state in reducer function
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // write case as state-domain
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}
// Create Reducer for Customer Object
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

//Combining Multiple Reducers into a rootReducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// create a store to disptach actions
const store = createStore(rootReducer);
// pass the event
// store.dispatch({ type: "account/deposit", payload: 500 });
// //console.log the current state of our store
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 200 });
// //console.log the current state of our store
// console.log(store.getState());
// //using an object inside payload value
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a Car" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());
///////////////////
// using Action Creators
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
store.dispatch(deposit(500));
console.log(store.getState());
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
store.dispatch(withdraw(200));
console.log(store.getState());
function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
store.dispatch(requestLoan(1000, "Buy a Car"));
console.log(store.getState());
function payLoan() {
  return { type: "account/payLoan" };
}
store.dispatch(payLoan());
console.log(store.getState());
// Create Action creator for Customer Object
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
// Update Customer Object
function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
// dispatch the customer details to store
store.dispatch(createCustomer("Kiran", "234565432"));
console.log(store.getState());
