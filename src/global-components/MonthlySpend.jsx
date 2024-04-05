import React from "react";

const MonthlySpend = ({ className = "monthly-spend-container" }) => {
  return (
    <div className={className}>
      <div className="dflex montly-data">
        <h5>Average Monthly Spent</h5>
        <strong>10Rs</strong>
      </div>
      <div className="dflex montly-data">
        <h5>Last 6 Month Total Spent</h5>
        <strong>10Rs</strong>
      </div>
      <div className="dflex montly-data">
        <h5>Last 1 Year Total Spent</h5>
        <strong>10Rs</strong>
      </div>
    </div>
  );
};

export default MonthlySpend;
