import React from "react";
import "./transaction.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { getCurrentFormattedDate } from "../utils/helpers";

const NewTransaction = ({ formData, setFormData, showLabels = true }) => {
  const { categories } = useSelector((state) => state);
  const handleFormDataChange = (e) => {
    debugger;
    const { name, value } = e.target;
    if (name === "amount") {
      const _val = Number(value);
      if (isNaN(_val) || _val < 0) return;
      setFormData((data) => {
        return {
          ...data,
          amount: _val,
        };
      });
    } else {
      setFormData((oldData) => {
        return {
          ...oldData,
          [name]: value,
        };
      });
    }
  };
  return (
    <div className="form-container dflex flex-col">
      <h2 className="text-center mb-15 mt-15">New Transaction</h2>
      <div className="form-wrapper dflex flex-col">
        <Select
          className="form-entity"
          defaultValue={categories[0]}
          label="category"
          value={formData.category}
          name="category"
          onChange={handleFormDataChange}
        >
          {categories.map((category, index) => (
            <MenuItem key={categories + index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <TextField
          name="amount"
          label={showLabels ? "Amount in Rs" : ''}
          variant="outlined"
          className="mt-15 mb-15 form-entity"
          value={formData.amount}
          onChange={handleFormDataChange}
        />
        <input
          type="date"
          name="transactionDate"
          value={getCurrentFormattedDate(formData.transactionDate)}
          className="datepicker-input form-entity"
          onChange={handleFormDataChange}
          max={getCurrentFormattedDate(new Date())}
        />
        <TextField
          name="description"
          label={showLabels ? "Description" : ''}
          variant="outlined"
          className="mt-15 mb-15 form-entity"
          value={formData.description}
          onChange={handleFormDataChange}
        />
      </div>
    </div>
  );
};

export default NewTransaction;
