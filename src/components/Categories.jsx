import React, { useEffect, useMemo, useState } from "react";
import "./categories.css";
import { useDispatch, useSelector } from "react-redux";
import useCategoriesExpands from "../custom-hooks/useCategoriesExpands";
import { Button, TextField } from "@mui/material";
import CustomModal from "../global-components/CustomModal";
import DeleteButton from "../custom-logo/DeleteButton";
import { ADD_CATEGORY, DELETE_CATEGORY } from "../redux/actions";
import useAddTransaction from "../custom-hooks/useAddTransaction";
const Categories = () => {
  const [categoryToAdd, setCategoryToAdd] = useState("");
  const { categories, transactions } = useSelector((state) => state);
  const [isExpanded, dataToShow, getDataList] = useCategoriesExpands();
  const dispatch = useDispatch();
  const [isOpen, openModal, closeModal] = useAddTransaction();

  const handleDeleteCategory = (category) => {
    dispatch({
      type: DELETE_CATEGORY,
      payload: category,
    });
  };

  const handleAddCategory = () => {
    dispatch({
      type: ADD_CATEGORY,
      payload: categoryToAdd,
    });
    setCategoryToAdd("");
  };
  const usedCategoriesInTransactions = useMemo(() => {
    const _categories = [];
    transactions.forEach((t) => {
      if (!_categories.includes(t.category)) {
        _categories.push(t.category);
      }
    });
    return _categories;
  }, [transactions]);

  const handleShowClicked = () => {
    getDataList(!isExpanded, categories);
  };
  useEffect(() => {
    getDataList(false, categories);
  }, []);

  return (
    <div className="categories dflex flex-col">
      <Button
        variant="contained"
        style={{ marginRight: 20, marginBottom: 30 }}
        onClick={openModal}
      >
        Manage
      </Button>
      <CustomModal isOpen={isOpen} onClose={closeModal} isOkVisible={false}>
        <h3 className="mb-15 text-center">Categories</h3>
        <div className="add-category dflex mt-15 mb-15">
          <TextField
            name="category"
            label="category to add"
            variant="outlined"
            className="mt-15 mb-15 form-entity"
            value={categoryToAdd}
            onChange={(e) => setCategoryToAdd(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={
              categories
                .map((c) => c.toLowerCase())
                .includes(categoryToAdd.toLowerCase()) || !categoryToAdd
            }
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="display-category dflex">
            <h4>{cat}</h4>
            <Button
              disabled={usedCategoriesInTransactions.includes(cat)}
              title={
                usedCategoriesInTransactions.includes(cat)
                  ? "Category used in transaction, cannot be deleted"
                  : ""
              }
              onClick={() => handleDeleteCategory(cat)}
            >
              <DeleteButton />
            </Button>
          </div>
        ))}
      </CustomModal>
      <h2 className="mb-15">Categories</h2>
      <pre>
        {dataToShow.map((cat) => (
          <div className="category-name" key={cat}>
            {cat}
          </div>
        ))}
      </pre>
      {categories.length > 5 ? (
        <div className="btn-show-more" onClick={handleShowClicked}>
          {`Show ${!isExpanded ? categories.length - 5 + " more" : "less"}`}
        </div>
      ) : null}
    </div>
  );
};

export default Categories;
