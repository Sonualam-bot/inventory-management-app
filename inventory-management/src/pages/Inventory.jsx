import { useDispatch, useSelector } from "react-redux";
import { InventoryForm } from "../forms/InventoryForm";

import "../Css/Form.css";
import { useState } from "react";
import { getUpdatedInventoryItems } from "../utils/inventory.utils";
import {
  editInventory,
  updateInventoryItems,
} from "../actions/inventoryAction";

//react icons

export const Inventory = () => {
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const inventoryItemList = useSelector(
    (state) => state.inventoryState.inventoryItems
  );

  const dispatch = useDispatch();

  const handleEditInventory = (item) => {
    setShowInventoryForm(true);
    dispatch(editInventory(true));
    dispatch(updateInventoryItems(item));
  };

  return (
    <>
      <button
        className="commonBtn"
        onClick={() => setShowInventoryForm(!showInventoryForm)}
      >
        Add Items To Inventory
      </button>

      {showInventoryForm && (
        <InventoryForm setShowInventoryForm={setShowInventoryForm} />
      )}

      <div>
        <table>
          <thead>
            <tr>
              <th>Sn. No.</th>
              <th>Name</th>
              <th>Price </th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItemList?.map((item, index) => {
              const totalPrice = item.price * item.quantity;

              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{totalPrice}</td>
                  <td>
                    <div className="tableBtn">
                      <span
                        className="material-symbols-outlined"
                        onClick={() => handleEditInventory(item)}
                      >
                        edit_note
                      </span>
                      <span
                        className="material-symbols-outlined"
                        onClick={() =>
                          getUpdatedInventoryItems(dispatch, item._id)
                        }
                      >
                        delete
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
