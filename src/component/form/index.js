import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import style from "./style.module.css";
export default function FormSection({
  CloseExpenseModal,
  setWalletBalance,
  walletBalance,
  setExpenseList,
  expenseList,
  editId,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [isFormData, setIsFormData] = useState({
    title: "",
    category: "",
    price: "",
    date: "",
  });
  const handleChange = (e) => {
    const isName = e.target.name;
    setIsFormData((prev) => ({ ...prev, [isName]: e.target.value }));
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (walletBalance < Number(isFormData.price)) {
      enqueueSnackbar("not sufficient balance", { variant: "warning" });
      return;
    }
    setWalletBalance((prev) => prev - Number(isFormData.price));
    CloseExpenseModal(false);

    setExpenseList((prev) => {
      const createId = prev.length > 0 ? prev[0].id : 0;
      return [{ ...isFormData, id: createId + 1 }, ...prev];
    });

    setIsFormData({
      title: "",
      category: "",
      price: "",
      date: "",
    });
    CloseExpenseModal(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const update = expenseList.map((item) => {
      if (item.id === editId) {
        const updatePrice = item.price - Number(isFormData.price);
        if (updatePrice < 0 && Math.abs(updatePrice) > walletBalance) {
          console.log("this is not correct amount");
          return { ...item };
        }
        setWalletBalance((prev) => prev + updatePrice);
        return { ...isFormData, id: editId };
      } else {
        return item;
      }
    });
    setExpenseList(update);
    CloseExpenseModal(false);
  };

  useEffect(() => {
    if (editId) {
      const list = expenseList.find((prev) => prev.id === editId);
      setIsFormData({
        title: list.title,
        category: list.category,
        price: list.price,
        date: list.date,
      });
    }
  }, [editId]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={style.expenseWrapper}>
              <h1 className={style.heading}>
                {editId ? "Edit Expenses" : "Add Expenses"}
              </h1>
              <form onSubmit={editId ? handleEdit : handleAdd}>
                <div className={style.expenseContent}>
                  <input
                    className={style.textInputs}
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={isFormData.title}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={style.textInputs}
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={isFormData.price}
                    onChange={handleChange}
                    required
                  />
                  <select
                    className={style.textInputs}
                    name="category"
                    value={isFormData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select category
                    </option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="travel">Travel</option>
                  </select>
                  <input
                    className={style.textInputs}
                    placeholder="Date"
                    type="date"
                    name="date"
                    onChange={handleChange}
                    required
                  />
                  <button className={style.expenseBtn} type="submit">
                    {editId ? "Edit Expense" : "Add Expense"}
                  </button>
                  <button
                    type="button"
                    className={style.cancelBtn}
                    onClick={() => CloseExpenseModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
