import "./navbar.scss";

import {
  faCartShopping,
  faMagnifyingGlass,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav>
        <div className="navbar-items">
          <div className="nav-link">
            <NavLink exact to={"/"} className="logo">
              DA KATTY
            </NavLink>
            <NavLink exact to={"/shop"}>
              Shop
            </NavLink>
            <Link to="/">About</Link>
          </div>

          <div className="nav-buttons">
            <button className="search-btn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button className="cart-btn">
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
            <button className="admin-btn">
              <NavLink exact to={"/admin"}>
                <FontAwesomeIcon icon={faUserShield} />
              </NavLink>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
