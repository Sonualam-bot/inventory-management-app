import { NavLink } from "react-router-dom";
import "../Css/Navigation.css";

export const NavigationLeft = () => {
  return (
    <>
      <div className="navigation">
        <div className="nav-child">
          <div>
            <NavLink className="navlink" to="/">
              DashBoard
            </NavLink>
          </div>
          <div>
            <NavLink className="navlink" to="/inventory">
              Inventory
            </NavLink>
          </div>
          <div>
            <NavLink className="navlink" to="/sale">
              Sale
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
