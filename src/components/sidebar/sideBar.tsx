/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.scss";
import { NavLink, useRouteMatch } from "react-router-dom";
import {
  faHouse,
  faRightFromBracket,
  faTableList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Login from "../popUp/LoginSignup/Login";
import SignUp from "../popUp/LoginSignup/Signup";
import { createPortal } from "react-dom";

function Sidebar() {
  const { url } = useRouteMatch();

  const styleNav = {
    onView: {
      backgroundColor: "#7631fe",
      color: "#fff",
    },
    offView: {
      backgroundColor: "#001C41",
      color: "#fff",
    },
  };

  const [loginSignup, setLoginSignup] = useState("");
  const handleMode = (mode: string) => {
    setLoginSignup(mode);
  };

  return (
    <>
      <div className="sidebar">
        <div className="admin">
          <p>Welcome back, ng hoang!</p>
          <button>
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
          </button>
          {/* <button onClick={handleLogin}>
            Change account <FontAwesomeIcon icon={faUser} />
          </button> */}
        </div>
        <div className="for-admin">
          <h3>Admin Dashboard</h3>
          <ul>
            <li>
              <NavLink exact to="/" activeStyle={styleNav.onView} >
                <FontAwesomeIcon icon={faHouse} />
                Back to Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to={`${url}/products`}
                activeStyle={styleNav.onView}
              >
                <FontAwesomeIcon icon={faTableList} />
                Product List
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url} stf`} activeStyle={styleNav.onView}>
                <FontAwesomeIcon icon={faUsers} />
                managing account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {loginSignup === "login" &&
        createPortal(
          <Login
            onCloseModal={() => setLoginSignup("")}
            handleMode={handleMode}
          />,
          document.body
        )}
      {loginSignup === "signup" &&
        createPortal(
          <SignUp
            onCloseModal={() => setLoginSignup("")}
            handleMode={handleMode}
          />,
          document.body
        )}
    </>
  );
}

export default Sidebar;
