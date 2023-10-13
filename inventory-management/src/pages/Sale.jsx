import { useState } from "react";
import { SaleForm } from "../forms/SaleForm";

import "../Css/Form.css";
import { useDispatch, useSelector } from "react-redux";
import { getUpdatedSales } from "../utils/sale.utils";
import { editSales, updateSaleItems } from "../actions/saleAction";

import jsPDF from "jspdf";
import "jspdf-autotable";

export const Sale = () => {
  const [showSaleForm, setShowSaleForm] = useState(false);
  const saleItemList = useSelector((state) => state.saleState.saleItems);

  const dispatch = useDispatch();

  const handleEditSale = (item) => {
    setShowSaleForm(true);
    dispatch(editSales(true));
    dispatch(updateSaleItems(item));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const columns = ["Sn. No.", "Description", "Amount"];
    const data = saleItemList.map((item, index) => [
      index + 1,
      item.description,
      item.amount,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
    });

    doc.save("sales.pdf");
  };

  return (
    <>
      <div className="saleBtnsTop">
        <button
          className="commonBtn"
          onClick={() => setShowSaleForm(!showSaleForm)}
        >
          Record Sale
        </button>
        <button className="commonBtn" onClick={generatePDF}>
          Print Sales Report
        </button>
      </div>
      {/* <input type="text" placeholder="search by data and name" /> */}

      {showSaleForm && <SaleForm setShowSaleForm={setShowSaleForm} />}

      <div>
        <table>
          <thead>
            <tr>
              <th>Sn. No.</th>
              <th>Description</th>
              <th>Amount </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {saleItemList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>

                  <td>
                    <div className="tableBtn">
                      <span
                        className="material-symbols-outlined"
                        onClick={() => handleEditSale(item)}
                      >
                        edit_note
                      </span>
                      <span
                        className="material-symbols-outlined"
                        onClick={() => getUpdatedSales(dispatch, item._id)}
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
