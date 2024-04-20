import "./navbar.scss";

import {
  faCartShopping,
  faGears,
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
import SignUp from "../popUp/LoginSignup/Signup";
import CustomerInfo from "../popUp/Customer/Customer";

function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { currentAccount } = useSelector(selectAuthAccountState);
  const history = useHistory();

  const [modal, setModal] = useState({
    login: false,
    signup: false,
  });
  const handleFirstLogin = () => {
    if (currentAccount.email === "" || currentAccount.password === "") {
      setModal({ ...modal, login: true });
    } else {
      history.push("/admin");
    }
  };

  const handleCloseLogin = () => {
    setModal({ ...modal, login: false });
  };
  const handleCloseSignup = () => {
    setModal({ ...modal, signup: false });
  };

  const handleSwitchToLogin = () => {
    setModal({ ...modal, signup: false, login: true });
  };
  const handleSwitchToSingup = () => {
    setModal({ ...modal, signup: true, login: false });
  };
  const handleRegisterSuccess = () => {
    setTimeout(() => {
      setModal({ ...modal, signup: false, login: true });
    }, 250);
  };

  const [iconAfterLogin, setIconAfterLogin] = useState(false);
  const handleForAdmin = () => {
    handleCloseLogin();
    history.push("/admin");
  };

  useEffect(() => {
    dispatch(fetchAuthAccount());
  }, [dispatch]);

  useEffect(() => {
    if (currentAccount.email !== "" && currentAccount.password !== "") {
      setIconAfterLogin(true);
    } else {
      setIconAfterLogin(false);
    }
  }, [currentAccount]);

  // ============================ADDING TO CART============================
  const [addToCart, setAddToCart] = useState(false);
  const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAddToCart(true);
  };
  const handleCloseAddToCart = () => {
    setAddToCart(false);
  };

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
              <button className="cart-btn" onClick={handleAddToCart}>
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

      {modal.login &&
        createPortal(
          <Login
            mode="login"
            extraMode="off-admin"
            onCloseModal={handleCloseLogin}
            onChangeMode={handleSwitchToSingup}
            authChecked={handleForAdmin}
            selectedAccount={{ id: "", email: "", password: "" }}
          />,
          document.body
        )}

      {modal.signup &&
        createPortal(
          <SignUp
            mode="off-admin"
            onChangeMode={handleSwitchToLogin}
            onSubmitSuccess={handleRegisterSuccess}
            onCloseModal={handleCloseSignup}
          />,
          document.body
        )}

      {addToCart &&
        createPortal(
          <CustomerInfo onClose={handleCloseAddToCart} />,
          document.body
        )}
    </>
  );
}

export default Navbar;
