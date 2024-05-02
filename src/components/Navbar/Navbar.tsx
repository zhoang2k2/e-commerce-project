import "./navbar.scss";

import {
  faArrowRightFromBracket,
  faCartShopping,
  faGears,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useHistory } from "react-router-dom";
import Login from "../PopUp/LoginSignup/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthAccount,
  selectAuthAccountState,
} from "../../redux/reducer/AuthAccountSlides";

import CustomerInfo from "../PopUp/Customer/CustomerInfo";
import CustomerLogin from "../PopUp/Customer/CustomerLogin";
import {
  fetchAuthCustomer,
  selectAuthCustomerState,
} from "../../redux/reducer/AuthCustomerSlide";
import ConfirmLogout from "../PopUp/Confirm/ConfirmLogout";
import SignUp from "../PopUp/LoginSignup/Signup";
import CartPop from "../PopUp/Cart/Cart";

function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { currentAccount } = useSelector(selectAuthAccountState);
  const { currentCustomerAccount } = useSelector(selectAuthCustomerState);

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
  const [customerModal, setCustomerModal] = useState({
    register: false,
    login: false,
    confirm: false,
  });
  const handleCustomerLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCustomerModal({ ...customerModal, login: true });
  };
  const handleCloseCustomerRegister = () => {
    setCustomerModal({ ...customerModal, register: false });
  };
  const handleCloseCustomerLogin = () => {
    setCustomerModal({ ...customerModal, login: false });
  };

  const handleCustomerSwitchToLogin = () => {
    setCustomerModal({ ...customerModal, register: false, login: true });
  };
  const handleCustomerSwitchToRegister = () => {
    setCustomerModal({ ...customerModal, register: true, login: false });
  };

  const handleLogoutConfirm = () => {
    setCustomerModal({ ...customerModal, confirm: true });
  };
  const handleCancleLogout = () => {
    setCustomerModal({ ...customerModal, confirm: false });
  };

  const [customerStatus, setCustomerStatus] = useState(false);
  useEffect(() => {
    dispatch(fetchAuthCustomer());
  }, [dispatch, customerStatus]);

  useEffect(() => {
    if (
      currentCustomerAccount.username !== "" &&
      currentCustomerAccount.password !== ""
    ) {
      setCustomerStatus(true);
    } else {
      setCustomerStatus(false);
    }
  }, [currentCustomerAccount]);

  const [cartModal, setCartModal] = useState(false);
  const handleOpenCart = () => {
    setCartModal(true);
  };
  const handleCloseCart = () => {
    setCartModal(false);
  };

  const handleLogoutSuccess = () => {
    setCustomerStatus(false);
    setCartModal(false);
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
              <button className="cart-btn" onClick={handleOpenCart}>
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
              <button className="admin-btn" onClick={handleFirstLogin}>
                {iconAfterLogin ? (
                  <FontAwesomeIcon icon={faGears} />
                ) : (
                  <FontAwesomeIcon icon={faUserShield} />
                )}
              </button>
              {customerStatus ? (
                <div className="customer-after-login">
                  <span>{currentCustomerAccount.username}</span>
                  <button onClick={handleLogoutConfirm}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </button>
                </div>
              ) : (
                <button
                  className="customer-before-login"
                  onClick={handleCustomerLogin}
                >
                  Login
                </button>
              )}
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

      {customerModal.register &&
        createPortal(
          <CustomerInfo
            onClose={handleCloseCustomerRegister}
            onChangeMode={handleCustomerSwitchToLogin}
            onCustomerRegisterSuccess={handleCustomerSwitchToLogin}
          />,
          document.body
        )}

      {customerModal.login &&
        createPortal(
          <CustomerLogin
            onClose={handleCloseCustomerLogin}
            onChangeMode={handleCustomerSwitchToRegister}
            onLoginSuccess={() => setCustomerStatus(true)}
          />,
          document.body
        )}

      {customerModal.confirm &&
        createPortal(
          <ConfirmLogout
            onCancle={handleCancleLogout}
            onLogoutSuccess={handleLogoutSuccess}
            mode="customer"
          />,
          document.body
        )}

      {cartModal &&
        createPortal(<CartPop onClose={handleCloseCart} />, document.body)}
    </>
  );
}

export default Navbar;
