import React, { useState } from "react";
import Pagination from "../pagination";
import AppModal from "../modal";
import FormSection from "../form";
import style from "./style.module.css";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { PiPizzaLight } from "react-icons/pi";
import { MdMovie } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";

export default function TransactionList({
  expenseList,
  setExpenseList,
  updateBalance,
  setUpdateBalance,
}) {
  const [forEdit, setForEdit] = useState(0);
  const [forModal, setForModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 3; 
  const currentItems = expenseList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleEdit = (id) => {
    setForEdit(id);
    setForModal(true);
  };

  const handleDelete = (id) => {
    const matchId = expenseList.find((list) => list.id === id);
    const updatedList = expenseList.filter((val) => val.id !== id);

    setExpenseList(updatedList);
    setUpdateBalance((prev) => prev + Number(matchId.price));

    const maxPage = Math.ceil(updatedList.length / itemsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  };

  return (
    <>
      <div className={style.transactionContainer}>
        {expenseList.length > 0 ? (
          <div className={style.contentWrapper}>
            {currentItems.map((item) => (
              <React.Fragment key={item.id}>
                <div className={style.transactionContent}>
                  <div className={style.leftWrapper}>
                    {/* Render icons based on category */}
                    {item.category === "food" && <PiPizzaLight />}
                    {item.category === "entertainment" && <MdMovie />}
                    {item.category === "travel" && <FaSuitcaseRolling />}

                    <div className={style.leftContent}>
                      <h4 className={style.titleText}>{item.title}</h4>
                      <p className={style.dateText}>{item.date}</p>
                    </div>
                  </div>

                  <div className={style.rightContent}>
                    <p className={style.priceText}>₹{item.price}</p>
                    <button
                      className={style.deleteBtn}
                      onClick={() => handleDelete(item.id)}
                    >
                      <TiDeleteOutline />
                    </button>
                    <button
                      className={style.editBtn}
                      onClick={() => handleEdit(item.id)}
                    >
                      <MdEdit />
                    </button>
                  </div>
                </div>
              <Divider sx={{position:"relative", width:"100%",backgroundColor: '#9B9B9B',zIndex:"99", height: '5px', margin: '20px 0' }} />       
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className={style.opttionalText}>
            <Typography
            component="h6"
            sx={{textAlign:{md:"left",xs:"center"},fontSize:{md:"20px",xs:"10px"},fontWeight:"400"}}
            >No transactions!</Typography>
          </div>
        )}
        {/* Pagination Component */}
        {expenseList.length > itemsPerPage && (
          <Pagination
            totalItems={expenseList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>

      <AppModal isOpen={forModal} onClose={setForModal}>
        <FormSection
          CloseExpenseModal={setForModal}
          editId={forEdit}
          setId={setForEdit}
          walletBalance={updateBalance}
          setWalletBalance={setUpdateBalance}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
        />
      </AppModal>
    </>
  );
}
