import "./sidebar.scss";

import AdminAccount from "./adminAccount";
import SidebarFunction from "./sidebarFunction";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <AdminAccount />
        <SidebarFunction />
      </div>
    </>
  );
}

export default Sidebar;
