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
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const sortedSales = saleItemList.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  return (
    <>
      <div className="parent">
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
          <fieldset>
            <legend>Sort By Date</legend>

            <span
              onClick={() => handleSort("asc")}
              className="material-symbols-outlined"
            >
              arrow_upward
            </span>

            <span
              onClick={() => handleSort("desc")}
              className="material-symbols-outlined"
            >
              arrow_downward
            </span>
          </fieldset>
        </div>

        {showSaleForm && <SaleForm setShowSaleForm={setShowSaleForm} />}

        {sortedSales?.length === 0 ? (
          <div>
            <h2>Loading Data...</h2>
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sn. No.</th>
                  <th>Description</th>
                  <th>Amount </th>
                  <th>Date</th>
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
                        {" "}
                        {new Date(item?.createdAt).toLocaleDateString("en-GB")}
                      </td>

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
        )}
      </div>
    </>
  );
};
