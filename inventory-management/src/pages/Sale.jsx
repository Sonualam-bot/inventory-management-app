import { useState } from "react";
import { SaleForm } from "../forms/SaleForm";

import "../Css/Form.css";
import { useDispatch, useSelector } from "react-redux";
import { getUpdatedSales } from "../utils/sale.utils";

export const Sale = () => {
  const [showSaleForm, setShowSaleForm] = useState(false);
  const saleItemList = useSelector((state) => state.saleState.saleItems);

  console.log(saleItemList);

  const dispatch = useDispatch();

  return (
    <>
      <button
        className="commonBtn"
        onClick={() => setShowSaleForm(!showSaleForm)}
      >
        Record Sale
      </button>

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
                      <span className="material-symbols-outlined">
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
