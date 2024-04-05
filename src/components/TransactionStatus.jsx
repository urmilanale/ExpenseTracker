import React from "react";

const TransactionStatus = ({ status = "Done" }) => {
  return (
    <div
      className={`transaction-status ${
        status === "Done" ? "status-success" : "status-failed"
      }`}
    >
      {status}
    </div>
  );
};

export default TransactionStatus;
