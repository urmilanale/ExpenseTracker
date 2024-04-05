import {
  ADD_CATEGORY,
  CREDIT_TRANSACTION,
  DEBIT_TRANSACTION,
  DELETE_CATEGORY,
  UPDATE_TRANSACTION,
} from "../actions";
import { initState } from "./initialState";

export const expenseReducer = (state = initState, action) => {
  const { type, payload } = action;
  const { totalIncome, totaExpense, transactions, accountBalance, categories } =
    state;

  switch (type) {
    case CREDIT_TRANSACTION:
      return {
        ...state,
        totalIncome: totalIncome + Number(payload.amount),
        accountBalance: accountBalance + Number(payload.amount),
        transactions: [{ ...payload, status: "Done" }, ...transactions].sort(
          (a, b) => {
            return new Date(b.transactionDate) - new Date(a.transactionDate);
          }
        ),
      };
    case DEBIT_TRANSACTION:
      if (payload.amount > accountBalance) {
        return {
          ...state,
          transactions: [{ ...payload, status: "Failed" }, ...transactions],
        };
      }
      const _newState = {
        ...state,
        accountBalance: accountBalance - Number(payload.amount),
        transactions: [{ ...payload, status: "Done" }, ...transactions].sort(
          (a, b) => {
            return new Date(b.transactionDate) - new Date(a.transactionDate);
          }
        ),
        totaExpense: totaExpense + Number(payload.amount),
      };
      return {
        ..._newState,
        accountBalance: _newState.totalIncome - _newState.totaExpense,
      };
    case DELETE_CATEGORY:
      const _categories = categories.filter((c) => c !== payload);
      return {
        ...state,
        categories: _categories,
      };

    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...categories],
      };
    case UPDATE_TRANSACTION:
      const { timeStamp } = payload;
      const index = transactions?.findIndex(transaction => transaction?.timeStamp === timeStamp ) 
      const _transactions = {...transactions}
      _transactions[index] = {...payload, timeStamp: Date.now()};
      //TODO: need to apply a validation on transaction update and update the balances accordingly depends upon
      // types of transaction
      return state;
    default:
      return state;
  }
};
