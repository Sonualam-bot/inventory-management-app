import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./component/Header";
import { NavigationLeft } from "./component/NavigationLeft";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { Sale } from "./pages/Sale";
import { getInventoryItems } from "./utils/inventory.utils";

import { useDispatch } from "react-redux";
import { getAllRecordedSales } from "./utils/sale.utils";
// import { Footer } from "./pages/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getInventoryItems(dispatch);
    getAllRecordedSales(dispatch);
  });

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="navContainer">
          <NavigationLeft />
        </div>
        <div className="route">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sale" element={<Sale />} />
          </Routes>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
