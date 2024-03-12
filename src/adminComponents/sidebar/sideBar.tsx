/* eslint-disable @typescript-eslint/no-explicit-any */
import "./sidebar.scss";
import AdminAccount from "./adminAccount";
import SidebarFunction from "./sidebarFunction";

interface SidebarProps {
  handleList: (e: any) => void;
  handleAdd: (e: any) => void;
  styleNavOnView: any;
  styleNav:any
}

function Sidebar({ handleList, handleAdd, styleNavOnView, styleNav }: SidebarProps) {
  return (
    <>
      <div className="sidebar">
        <AdminAccount />
        <SidebarFunction
          handleList={handleList}
          handleAdd={handleAdd}
          styleNavOnView={styleNavOnView}
          styleNav={styleNav}
        />
      </div>
    </>
  );
}

export default Sidebar;
