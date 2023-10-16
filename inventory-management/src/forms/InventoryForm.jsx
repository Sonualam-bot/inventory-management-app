import { useDispatch, useSelector } from "react-redux";
import "../Css/Form.css";
import {
  editInventory,
  updateInventoryItems,
} from "../actions/inventoryAction";
import { addItemToInventory } from "../services/inventory.services";
import {
  getInventoryItems,
  updateEditedInventoryItems,
} from "../utils/inventory.utils";

export const InventoryForm = ({ setShowInventoryForm }) => {
  const inventoryInput = useSelector(
    (state) => state.inventoryState.inventoryInput
  );

  const editInventoryItems = useSelector(
    (state) => state.inventoryState.editInventoryItems
  );

  const dispatch = useDispatch();

  const handleInventoryInput = (e) => {
    const { name, value } = e.target;
    console.log({ ...inventoryInput, [name]: value });
    dispatch(updateInventoryItems({ ...inventoryInput, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editInventoryItems) {
        updateEditedInventoryItems(dispatch, inventoryInput);
      } else {
        const submit = await addItemToInventory(inventoryInput);
        if (submit) {
          getInventoryItems(dispatch);
        }
      }
      setShowInventoryForm(false);
      dispatch(
        updateInventoryItems({
          name: "",
          quantity: "",
          price: "",
          category: "",
        })
      );
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const closeModal = () => {
    setShowInventoryForm(false);
    dispatch(editInventory(false));
    dispatch(
      updateInventoryItems({
        name: "",
        quantity: "",
        price: "",
        category: "",
      })
    );
  };

  const inventoryCategories = [
    "Electronics",
    "Clothing",
    "Furniture",
    "Home Appliances",
    "Sports Equipment",
    "Books",
    "Toys",
    "Health & Beauty",
    "Jewelry",
    "Food & Beverages",
  ];

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
            min="0"
            // onInput="this.value = Math.abs(this.value)"
            id="quantity"
            placeholder="Add Quantity"
            value={inventoryInput?.quantity}
            name="quantity"
            onChange={handleInventoryInput}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            min="0"
            // onInput="this.value = Math.abs(this.value)"
            id="price"
            placeholder="Enter price"
            value={inventoryInput?.price}
            name="price"
            onChange={handleInventoryInput}
          />
          <select
            name="category"
            value={inventoryInput?.category}
            onChange={handleInventoryInput}
          >
            <option value="">Select Category</option>
            {inventoryCategories?.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>

          <button type="submit" className="submitBtn">
            {editInventoryItems ? "Edit" : "Add"}
          </button>
          <button type="button" className="closebtn" onClick={closeModal}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};
