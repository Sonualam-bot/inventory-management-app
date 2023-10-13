import { useSelector } from "react-redux";
import "../Css/Dashboard.css";

export const Dashboard = () => {
  const inventoryList = useSelector(
    (state) => state.inventoryState.inventoryItems
  );
  const salesList = useSelector((state) => state.saleState.saleItems);
  return (
    <>
      <div className="dashboardParent">
        <div className="dashboardContainer">
          Total: {inventoryList.length}
          <p>Inventory</p>
        </div>
        <div className="dashboardContainer">
          Total: {salesList.length}
          <p>Sales</p>
        </div>
      </div>
    </>
  );
};
