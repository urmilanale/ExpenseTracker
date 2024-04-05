import { useState } from "react";
import { useDispatch } from "react-redux";
import { CREDIT_TRANSACTION, DEBIT_TRANSACTION, UPDATE_TRANSACTION } from "../redux/actions";

const useAddTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const updateTransaction = (formData) => {
    dispatch({type: UPDATE_TRANSACTION, payload: formData})
  }

  const addTransaction = (formDataFields, callback = () => null) => {
    const formData = {...formDataFields, timeStamp: Date.now()};
    if (formData.category === "Salary") {
      dispatch({
        type: CREDIT_TRANSACTION,
        payload: formData,
      });
    } else {
      dispatch({
        type: DEBIT_TRANSACTION,
        payload: formData,
      });
    }
    closeModal();
    callback();
  };
  return [isOpen, openModal, closeModal, addTransaction, updateTransaction];
};

export default useAddTransaction;
