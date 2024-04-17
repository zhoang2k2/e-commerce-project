import "./navbar.scss";

import {
  faCartShopping,
  faGears,
  faMagnifyingGlass,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useHistory } from "react-router-dom";
import Login from "../popUp/LoginSignup/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthAccount,
  selectAuthAccountState,
} from "../../redux/reducer/AuthAccountSlides";

function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { currentAccount } = useSelector(selectAuthAccountState);

  const [adminLogin, setAdminLogin] = useState(false);
  const handleFirstLogin = () => {
    if (currentAccount.email === "" || currentAccount.password === "") {
      setAdminLogin(true);
    } else {
      history.push("/admin");
    }
  };

  const handleCloseLogin = () => {
    setAdminLogin(false);
  };

  const [iconAfterLogin, setIconAfterLogin] = useState(false);
  const history = useHistory();
  const handleForAdmin = () => {
    handleCloseLogin();
    history.push("/admin");
  };

  useEffect(() => {
    dispatch(fetchAuthAccount());
  }, []);

  useEffect(() => {
    if (currentAccount.email !== "" && currentAccount.password !== "") {
      setIconAfterLogin(true);
    } else {
      setIconAfterLogin(false);
    }
  }, [currentAccount]);

  return (
    <>
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
              <button className="admin-btn" onClick={handleFirstLogin}>
                {iconAfterLogin ? (
                  <FontAwesomeIcon icon={faGears} />
                ) : (
                  <FontAwesomeIcon icon={faUserShield} />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {adminLogin &&
        createPortal(
          <Login
            mode="login"
            onCloseModal={handleCloseLogin}
            onChangeMode={() => {}}
            authChecked={handleForAdmin}
            selectedAccount={{ id: "", email: "", password: "" }}
          />,
          document.body
        )}
    </>
  );
}

export default Navbar;
