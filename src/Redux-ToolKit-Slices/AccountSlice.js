import { createSlice } from "@reduxjs/toolkit";
// create a Initial State object
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
// no need of writing Action Creators & Switch Cases to perform actions
const accountSlice = createSlice({
  // account : accountReducer
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
//export reducers directly by destructuring "accountSlice"
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
// export "deposit" reducer by making API Call with THUNK
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  // if currency is not "USD" then redux considers this as  asynchronous function
  return async function (dispatch, getState) {
    //API call
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    // dispatch action payload to store
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export default accountSlice.reducer;
