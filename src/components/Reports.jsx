import React, { useMemo } from "react";
import BarChart from "../global-components/BarChart";
import PieChart from "../global-components/PieChart";
import MonthlySpend from "../global-components/MonthlySpend";
import { useSelector } from "react-redux";
import { getMonthNameByDate } from "../utils/helpers";

const Reports = () => {
  const {
    transactions = [],
    totaExpense,
    accountBalance,
    totalIncome,
  } = useSelector((state) => state);
  const expenseTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) => transaction.category !== "Salary"
    );
  }, [transactions]);

  const finalExpensePerMonth = useMemo(() => {
    const dataToDisplay = {};
    expenseTransactions.forEach((t) => {
      const { amount, transactionDate } = t;
      const monthName = getMonthNameByDate(transactionDate);
      if (dataToDisplay[monthName] === undefined) {
        dataToDisplay[monthName] = amount;
      } else {
        dataToDisplay[monthName] = dataToDisplay[monthName] + amount;
      }
    });
    return dataToDisplay;
  }, [expenseTransactions]);

  const finalExpensePerCategory = useMemo(() => {
    const dataToDisplay = {};
    expenseTransactions.forEach((t) => {
      const { amount, category } = t;

      if (dataToDisplay[category] === undefined) {
        dataToDisplay[category] = amount;
      } else {
        dataToDisplay[category] = dataToDisplay[category] + amount;
      }
    });
    return dataToDisplay;
  }, [expenseTransactions]);

  return (
    <div className="reports-container dflex flex-col">
      {transactions.length === 0 || totaExpense === 0 ? (
        <h4 className="transaction-message">No Expenses availables</h4>
      ) : (
        <>
          <div style={{ paddingTop: 5 }}>
            <h3 className="mb-15 text-center">Expenses per Month</h3>
            <BarChart
              labels={Object.keys(finalExpensePerMonth).slice(0, 5)}
              dataToDisplay={Object.values(finalExpensePerMonth)}
            />
          </div>
          <div>
            {/* <h3 className="text-center">Average spend</h3> */}
            {/* <MonthlySpend /> */}
          </div>
          <div>
            <h3 className="text-center">Category spend</h3>
            {Object.keys(finalExpensePerCategory).map((category) => {
              return (
                <PieChart
                  data={[finalExpensePerCategory[category], accountBalance]}
                  itemName={category}
                  percentage={
                    (finalExpensePerCategory[category] / totalIncome) * 100
                  }
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
