import { useDispatch, useSelector } from "react-redux";
import "../Css/Form.css";
import { updateSaleItems } from "../actions/saleAction";
import { addItemToSales } from "../services/sale.services";
import { getAllRecordedSales } from "../utils/sale.utils";

export const SaleForm = ({ setShowSaleForm }) => {
  const saleInput = useSelector((state) => state.saleState.saleInput);
  const dispatch = useDispatch();

  const handleSaleInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateSaleItems({ ...saleInput, [name]: value }));
  };

  const handleSaleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const submit = await addItemToSales(saleInput);
      if (submit) {
        getAllRecordedSales(dispatch);
        dispatch(
          updateSaleItems({
            description: "",
            amount: "",
          })
        );
      }
      setShowSaleForm(false);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="form-container">
        <form className="formDiv" onSubmit={handleSaleFormSubmit}>
          <h2>Add Sales</h2>
          <label htmlFor="name">Item Name</label>
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
            id="amount"
            placeholder="Add Amount"
            onChange={handleSaleInput}
            value={saleInput?.amount}
            name="amount"
          />

          <button type="submit" className="submitBtn">
            Submit
          </button>
          <button
            type="button"
            className="closebtn"
            onClick={() => setShowSaleForm(false)}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};
