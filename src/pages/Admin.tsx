import Sidebar from "../components/Sidebar/Sidebar";
import SidebarRoutes from "../routes/SidebarRoutes";
import "../components/Body/body.scss";

function Admin() {
  return (
    <>
      <Sidebar />
      <div className="body-container">
        <div className="body">
          <SidebarRoutes />
        </div>
      </div>
    </>
  );
}

export default Admin;
