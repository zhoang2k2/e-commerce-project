import "./navbar.scss";

import {
  faCartShopping,
  faMagnifyingGlass,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav>
        <div className="navbar-items">
          <div className="nav-link">
            <div className="logo">E-commerce</div>
            <Link to="/">Shop</Link>
            <Link to="/">About</Link>
          </div>

          <div className="nav-buttons">
            <button className="search-btn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button className="cart-btn">
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
            <button>
              <FontAwesomeIcon icon={faUserShield} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
