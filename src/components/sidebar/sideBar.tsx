/* eslint-disable @typescript-eslint/no-explicit-any */
import "./sidebar.scss";
import { NavLink, useRouteMatch } from "react-router-dom";

function Sidebar() {
  const { url } = useRouteMatch();

  const styleNav = {
    onView: {
      backgroundColor: "#c4dffd",
      borderColor: "#c4dffd",
      color: "#001C41",
    },
    offView: {
      backgroundColor: "#001C41",
      borderColor: "#fff",
      color: "#fff",
    },
  };

  return (
    <>
      <div className="sidebar">
        <div className="admin">
          <h4>Admin ...</h4>
          <p>Welcome back!</p>
          <button>Logout</button>
        </div>
        <div className="for-admin">
          <h3>Admin Dashboard</h3>
          <ul>
            <li>
              <NavLink to={`${url}`} activeStyle={styleNav.onView}>
                Product List
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
