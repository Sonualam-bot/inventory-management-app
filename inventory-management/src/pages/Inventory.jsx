import { useDispatch, useSelector } from "react-redux";
import { InventoryForm } from "../forms/InventoryForm";
import "../Css/Form.css";
import { getUpdatedInventoryItems } from "../utils/inventory.utils";
import {
  editInventory,
  setInventoryItems,
  updateInventoryItems,
} from "../actions/inventoryAction";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";

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

  const handleSortByName = () => {
    console.log("here");
    const sortedItems = [...inventoryItemList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    dispatch(setInventoryItems(sortedItems));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const columns = ["Sn. No.", "Name", "Price", "Quantity", "Total Price"];
    const data = inventoryItemList.map((item, index) => [
      index + 1,
      item.name,
      item.price,
      item.quantity,
      item.price * item.quantity,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
    });

    doc.save("inventory.pdf");
  };

  return (
    <>
      <div className="parent">
        <div className="inventoryBTnTop">
          <button
            className="commonBtn"
            onClick={() => setShowInventoryForm(!showInventoryForm)}
          >
            Add Items To Inventory
          </button>

          <button className="commonBtn" onClick={generatePDF}>
            Print Inventory Report
          </button>
        </div>

        {showInventoryForm && (
          <InventoryForm setShowInventoryForm={setShowInventoryForm} />
        )}

        {inventoryItemList?.length === 0 ? (
          <div>
            <h2>Loading Data...</h2>
          </div>
        ) : (
          <div className="tableData">
            <table>
              <thead>
                <tr>
                  <th>Sn. No.</th>
                  <th onClick={handleSortByName}>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Total Price</th>
                  <th>Date</th>
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
                      <td>{item.category}</td>
                      <td>{totalPrice}</td>
                      <td>
                        {" "}
                        {new Date(item?.createdAt).toLocaleDateString("en-GB")}
                      </td>
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
        )}
      </div>
    </>
  );
};
