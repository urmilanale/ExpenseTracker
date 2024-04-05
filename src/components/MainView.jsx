import React from "react";
import "./main-view.css";
import Reports from "./Reports";
import ExpenseTable from "./ExpenseTable";
const MainView = () => {
  return (
    <div className="main-view-container dflex flex-row mt-15">
      <ExpenseTable />
      <Reports />
    </div>
  );
};

export default MainView;
