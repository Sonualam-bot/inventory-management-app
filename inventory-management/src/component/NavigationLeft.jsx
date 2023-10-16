import { NavLink } from "react-router-dom";
import "../Css/Navigation.css";

// icons
import { AiFillGithub } from "react-icons/ai";

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
          <div>
            <NavLink
              className="navlink"
              to="https://github.com/Sonualam-bot/inventory-management-app"
              target="_blank"
            >
              <AiFillGithub className="github" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
