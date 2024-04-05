import React, { Fragment, useState } from "react";
import "./main-view.css";
import TransactionStatus from "./TransactionStatus";
import { useSelector } from "react-redux";
import { getCurrentFormattedDate } from "../utils/helpers";
import useAddTransaction from "../custom-hooks/useAddTransaction";
import NewTransaction from "./NewTransaction";
import CustomModal from "../global-components/CustomModal";

const Headers = [
  { name: "#", accessor: "number", flex: 1, textAlign: "center" },
  { name: "Description", accessor: "description", flex: 2, textAlign: "left" },
  { name: "Category", accessor: "category", flex: 1, textAlign: "left" },
  { name: "Amount", accessor: "amount", flex: 1, textAlign: "right" },
  { name: "Status", accessor: "status", flex: 1, textAlign: "center" },
  { name: "Date", accessor: "date", flex: 2, textAlign: "center" },
  { name: "Operation", accessor: "operation", flex: 2, textAlign: "center" },
];

const ExpenseTable = () => {
  const { transactions } = useSelector((state) => state);
  const [isOpen, openModal, closeModal, _, updateTransaction] = useAddTransaction();
  const [formData, setFormData] = useState({});
  console.log(updateTransaction);

  const handleEditTransaction = (transaction) => {
    setFormData(transaction);
    openModal()
  }
  return (
    <div
      style={{ width: "100%", height: "400px", overflow: "auto" }}
      className="expense-table-container"
    >
      <h3 className="recent-transactions mt-15">Transactions</h3>
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        onOk={() => updateTransaction(formData)}
      >
        <NewTransaction formData={formData} setFormData={setFormData} showLabels={false}/>
      </CustomModal>
      <div className="dflex flex-col" style={{ width: "100%" }}>
        <div className="dflex table-header">
          {Headers.map((heading) => {
            const { flex, textAlign, name } = heading;
            return (
              <div
                key={name}
                className="p-8 table-heading-title"
                style={{ flex, textAlign }}
              >
                {name}
              </div>
            );
          })}
        </div>
        {transactions?.map((transaction, index) => {
          const { status, category, amount, transactionDate, description } =
            transaction;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                border: "1px solid #dddddd",
              }}
              key={transaction?.category + index}
            >
              <Fragment>
                <div style={{ flex: 1, textAlign: "center", padding: "8px" }}>
                  {index + 1}
                </div>
                <div style={{ flex: 2, textAlign: "left", padding: "8px" }}>
                  {description}
                </div>
                <div style={{ flex: 1, textAlign: "left", padding: "8px" }}>
                  {category}
                </div>
                <div style={{ flex: 1, textAlign: "right", padding: "8px" }}>
                  {amount}
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "8px" }}>
                  <TransactionStatus status={status} />
                </div>
                <div style={{ flex: 2, textAlign: "center", padding: "8px" }}>
                  {getCurrentFormattedDate(transactionDate)}
                </div>
                <div style={{ flex: 2, textAlign: "center", padding: "8px" }} onClick={() => handleEditTransaction(transaction)}>
                  Edit
                </div>
              </Fragment>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTable;
