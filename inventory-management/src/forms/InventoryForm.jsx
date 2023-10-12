import { useDispatch, useSelector } from "react-redux";
import "../Css/Form.css";
import { updateInventoryItems } from "../actions/inventoryAction";
import { addItemToInventory } from "../services/inventory.services";
import { getInventoryItems } from "../utils/inventory.utils";

export const InventoryForm = ({ setShowInventoryForm }) => {
  const inventoryInput = useSelector(
    (state) => state.inventoryState.inventoryInput
  );
  const dispatch = useDispatch();

  const handleInventoryInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateInventoryItems({ ...inventoryInput, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const submit = await addItemToInventory(inventoryInput);
      if (submit) {
        getInventoryItems(dispatch);
        dispatch(
          updateInventoryItems({
            name: "",
            quantity: "",
            price: "",
          })
        );
        setShowInventoryForm(false);
      }
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="form-container">
        <form className="formDiv" onSubmit={handleFormSubmit}>
          <h2>Add an Item</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter item name"
            value={inventoryInput?.name}
            name="name"
            onChange={handleInventoryInput}
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Add Quantity"
            value={inventoryInput?.quantity}
            name="quantity"
            onChange={handleInventoryInput}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={inventoryInput?.price}
            name="price"
            onChange={handleInventoryInput}
          />
          <button type="submit" className="submitBtn">
            Submit
          </button>
          <button
            type="button"
            className="closebtn"
            onClick={() => setShowInventoryForm(false)}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};
