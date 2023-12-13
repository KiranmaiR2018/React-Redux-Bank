//Creating new state object- Customer
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// Create Action creator for Customer Object
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
// Update Customer Object
export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
// Create Reducer for Customer Object
export default function customerReducer(state = initialStateCustomer, action) {
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
