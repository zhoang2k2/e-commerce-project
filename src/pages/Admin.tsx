import Sidebar from "../components/sidebar/sideBar";
import Body from "../components/body/Body";
import {
  AdminProvider,
  useAdminContext,
} from "../components/context/AdminContext";
import AddingPop from "../components/popUp/adding/AddingPop";

function Admin() {
  const { addingPopUp } = useAdminContext();

  return (
    <AdminProvider>
      <Sidebar />
      <Body />
      {addingPopUp && <AddingPop />}
    </AdminProvider>
  );
}

export default Admin;
{
  /* {confirmDelete && (
        <ConfirmPop
          content="delete"
          selectedId={selectedId}
          acceptDel={acceptDel}
          cancle={cancleChange}
          // acceptEdit={acceptEdit}
        />
      )}
      {openEdit && (
        <EditPop
          fields={fields}
          handleOnChange={handleOnChange}
          handleChangeImage={handleChangeImage}
          sendValue={getValueToAdd}
          confirmEditPop={confirmEditPop}
          cancleChange={cancleChange}
        />
      )} */
}
{
  /* {confirmEdit && (
        <ConfirmPop
          content="edit"
          selectedId={selectedId}
          acceptDel={acceptDel}
          cancle={cancleChange}
          acceptEdit={acceptEdit}
        />
      )} */
}
