import { createStore } from "redux";
import { expenseReducer } from "./reducers/expense-reducer";

// since we are having only one expense reducer, we don't need to combine.all other reducers.
const store = createStore(expenseReducer);

export { store };
