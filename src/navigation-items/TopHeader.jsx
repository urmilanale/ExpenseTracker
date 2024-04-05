import { Button, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import "./styles/navigations.css";
import InfoCards from "../global-components/InfoCards";
import DownloadButton from "../custom-logo/DownloadButton";
import LogoButton from "../global-components/LogoButton";
import { useSelector } from "react-redux";
import CustomModal from "../global-components/CustomModal";
import NewTransaction from "../components/NewTransaction";
import useAddTransaction from "../custom-hooks/useAddTransaction";
import { downloadCSV, getCurrentFormattedDate } from "../utils/helpers";

const TOP_CARDS = [
  {
    title: "Total Income",
    accessor: "totalIncome",
  },
  {
    title: "Total expenses",
    accessor: "totaExpense",
  },
  {
    title: "Saving Amount",
    accessor: "accountBalance",
  },
];

const initFormData = {
  category: "Salary",
  amount: 0,
  transactionDate: getCurrentFormattedDate(new Date()),
  description: "Salary Transaction",
};

const TopHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState(initFormData);
  const reduxData = useSelector((state) => state);
  const [isOpen, openModal, closeModal, addTransaction] = useAddTransaction();

  return (
    <div className="top-nav-header">
      <div className="app-heading">
        <div className="app-name">Expense Analyzer</div>
        <TextField
          id="search"
          label="Search transaction"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.8)",
          }}
        />
        <Button variant="contained" onClick={() => {}}>
          Search
        </Button>
        <div>
          <Button variant="contained" onClick={openModal}>
            Add Transaction
          </Button>
          <CustomModal
            isOpen={isOpen}
            onClose={closeModal}
            isOkDisabled={formData.amount <= 0}
            onOk={() => addTransaction(formData, setFormData(initFormData))}
          >
            <NewTransaction formData={formData} setFormData={setFormData} />
          </CustomModal>
        </div>
      </div>
      <div className="horizontal-seperator m-5" />
      <div className="cardinfo-container dflex flex-row mt-10">
        <div className="dflex flex-row ">
          {TOP_CARDS.map((card) => (
            <Fragment key={card.accessor}>
              <InfoCards
                heading={card.title}
                info={`₹ ${reduxData[card.accessor]}`}
                className={"mr-5"}
              />
            </Fragment>
          ))}
        </div>
        <div className="button-group dflex flex-row">
          <LogoButton
            title="Download"
            onClick={() => downloadCSV(reduxData.transactions)}
          >
            <DownloadButton />
          </LogoButton>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
