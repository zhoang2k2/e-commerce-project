/* eslint-disable @typescript-eslint/no-explicit-any */
import "./sidebar.scss";
import AdminAccount from "./adminAccount";
import SidebarFunction from "./sidebarFunction";

interface SidebarProps {
  handleList: (e: any) => void;
  handleAdd: (e: any) => void;
  styleNav: any;
}

function Sidebar({ handleList, handleAdd, styleNav }: SidebarProps) {
  return (
    <>
      <div className="sidebar">
        <AdminAccount />
        <SidebarFunction
          handleList={handleList}
          handleAdd={handleAdd}
          styleNav={styleNav}
        />
      </div>
    </>
  );
}

export default Sidebar;
