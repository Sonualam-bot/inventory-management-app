import { useDispatch, useSelector } from "react-redux";
import "../Css/Form.css";
import { editSales, updateSaleItems } from "../actions/saleAction";
import { addItemToSales } from "../services/sale.services";
import {
  getAllRecordedSales,
  updateEditedSalesItems,
} from "../utils/sale.utils";

export const SaleForm = ({ setShowSaleForm }) => {
  const saleInput = useSelector((state) => state.saleState.saleInput);

  const editSaleItems = useSelector((state) => state.saleState.editSaleItems);

  const dispatch = useDispatch();

  const handleSaleInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateSaleItems({ ...saleInput, [name]: value }));
  };

  const handleSaleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSaleItems) {
        updateEditedSalesItems(dispatch, saleInput);
      } else {
        const submit = await addItemToSales(saleInput);
        if (submit) {
          getAllRecordedSales(dispatch);
        }
      }
      setShowSaleForm(false);
      dispatch(
        updateSaleItems({
          description: "",
          amount: "",
        })
      );
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const closeSaleModal = () => {
    setShowSaleForm(false);
    dispatch(editSales(false));
    dispatch(
      updateSaleItems({
        description: "",
        price: "",
      })
    );
  };

  return (
    <div className="modal-overlay">
      <div className="form-container">
        <form className="formDiv" onSubmit={handleSaleFormSubmit}>
          <h2>Add Sales</h2>
          <label htmlFor="name">Enter Description</label>
          <input
            type="text"
            id="name"
            placeholder="Enter item description"
            onChange={handleSaleInput}
            value={saleInput?.description}
            name="description"
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            min="0"
            // onInput="this.value = Math.abs(this.value)"
            id="amount"
            placeholder="Add Amount"
            onChange={handleSaleInput}
            value={saleInput?.amount}
            name="amount"
          />

          <button type="submit" className="submitBtn">
            {editSaleItems ? "Edit" : "Add"}
          </button>
          <button type="button" className="closebtn" onClick={closeSaleModal}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};
