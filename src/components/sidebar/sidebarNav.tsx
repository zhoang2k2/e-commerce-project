/* eslint-disable @typescript-eslint/no-explicit-any */
// interface SidebarFunctionProps {
//   handleList: (e: any) => void;
//   handleAdd: (e: any) => void;
//   styleNav: any;
// }

// import { useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

function SidebarNav() {
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

  // const handleList = () => {
  //   setStyleNav("list");
  // };

  // const handleAdd = () => {
  //   setStyleNav("add");
  // };
  return (
    <>
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
    </>
  );
}

export default SidebarNav;
