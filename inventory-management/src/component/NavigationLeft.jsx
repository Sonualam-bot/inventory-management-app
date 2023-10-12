import {NavLink} from "react-router-dom"
import "../Css/Navigation.css"

export const NavigationLeft = () => {
    return (
        <>
            <div className="navigation" >
                <NavLink className="navlink" to="/" >DashBoard</NavLink>
                <NavLink className="navlink" to="/inventory" >Inventory</NavLink>
                <NavLink className="navlink" to="/sale" >Sale</NavLink>
            </div>
        </>
    )
}