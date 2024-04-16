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

function Sidebar() {
  const { url } = useRouteMatch();

  const styleNav = {
    backgroundColor: "#7631fe",
    color: "#fff",
  };

  return (
    <>
      <div className="sidebar">
        <div className="admin">
          <p>Welcome back, ng hoang!</p>
          <button>
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
          </button>
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
              <NavLink exact to={`${url}/products`} activeStyle={styleNav}>
                <FontAwesomeIcon icon={faTableList} />
                Product List
              </NavLink>
            </li>
            <li>
              <NavLink exact to={`${url}/adm-accounts`} activeStyle={styleNav}>
                <FontAwesomeIcon icon={faUsers} />
                admin account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
