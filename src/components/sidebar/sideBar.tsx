/* eslint-disable @typescript-eslint/no-explicit-any */
import "./sidebar.scss";
import AdminAccount from "./adminAccount";
import SidebarNav from "./sidebarNav";

// interface SidebarProps {
//   styleNav: any;
// }

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <AdminAccount />
        <SidebarNav />
      </div>
    </>
  );
}

export default Sidebar;
