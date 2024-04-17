/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.scss";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import {
  faHouse,
  faRightFromBracket,
  faTableList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthAccount,
  selectAuthAccountState,
} from "../../redux/reducer/AuthAccountSlides";
import { useEffect, useState } from "react";
import {
  fetchAccounts,
  selectAccountState,
} from "../../redux/reducer/AccountsSlide";
import { createPortal } from "react-dom";
import ConfirmLogout from "../popUp/Confirm/ConfirmLogout";

function Sidebar() {
  const { url } = useRouteMatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch<any>();
  const { currentAccount } = useSelector(selectAuthAccountState);
  const { accounts } = useSelector(selectAccountState);

  useEffect(() => {
    dispatch(fetchAuthAccount());
    dispatch(fetchAccounts());
  }, []);

  const matchAccount = accounts.find(
    (account) => account.email === currentAccount.email
  );

  const history = useHistory();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const handleConfirmLogout = () => {
    setConfirmLogout(true);
  };

  const handleCancle = () => {
    setConfirmLogout(false);
  };

  useEffect(() => {
    if (currentAccount.email === "" || currentAccount.password === "") {
      history.push("/");
    } else if (currentAccount.email !== "" && currentAccount.password !== "") {
      history.push("/admin");
    }
  }, [currentAccount, history]);

  const styleNav = {
    backgroundColor: "#7631fe",
    color: "#fff",
  };

  return (
    <>
      <div className="sidebar">
        <div className="admin">
          <p>
            Welcome back!
            <span>{matchAccount ? matchAccount.fullname : ""}</span>
          </p>
          <img src="https://i.imgur.com/diCbLpf.jpeg" alt="default ava" />
        </div>

        <div className="for-admin">
          <h3>Admin Dashboard</h3>
          <ul>
            <li>
              <NavLink exact to="/" activeStyle={styleNav}>
                <FontAwesomeIcon icon={faHouse} />
                Back to Shop
              </NavLink>
            </li>
            <li>
              <NavLink exact to={`${url}`} activeStyle={styleNav}>
                <FontAwesomeIcon icon={faTableList} />
                Product List
              </NavLink>
            </li>
            <li>
              <NavLink exact to={`${url}/accounts`} activeStyle={styleNav}>
                <FontAwesomeIcon icon={faUsers} />
                admin account
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="logout">
          <button onClick={handleConfirmLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>

      {confirmLogout &&
        createPortal(<ConfirmLogout onCancle={handleCancle} />, document.body)}
    </>
  );
}

export default Sidebar;
