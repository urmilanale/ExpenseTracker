import { useState } from "react";
import { useDispatch } from "react-redux";
import { CREDIT_TRANSACTION, DEBIT_TRANSACTION } from "../redux/actions";

const useAddTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addTransaction = (formData, callback = () => null) => {
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
  return [isOpen, openModal, closeModal, addTransaction];
};

export default useAddTransaction;
