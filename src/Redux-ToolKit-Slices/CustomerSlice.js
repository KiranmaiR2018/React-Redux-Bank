import { createSlice } from "@reduxjs/toolkit";
//Creating new state object- Customer
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
// Create the CustomerSlice object with Reducers
const customerSlice = createSlice({
  // customer : customerReducer
  name: "customer",
  initialState,
  reducers: {
    //passing more than 1 argument in "createCustomer" reducer
    //so we need to create an object with two functions prepare() & reducer()
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    // Reducer for updating Name
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
// export the reducers by destructing the customerSlice state
export const { createCustomer, updatename } = customerSlice.actions;
export default customerSlice.reducer;
