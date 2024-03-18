/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Form from "../adminComponents/form/Form";
import Sidebar from "../adminComponents/sidebar/sideBar";
import ProductList from "../adminComponents/table/Table";
import Body from "../adminComponents/body/Body";
import { GetData } from "../helpers/GetData";
import { DeleteData } from "../helpers/DeleteData";
import { PostData } from "../helpers/PostData";
import ConfirmPop from "../adminComponents/popUp/confirm/ConfirmPop";
import EditPop from "../adminComponents/popUp/editpop/EditPop";
import { PutData } from "../helpers/PutData";

interface FieldProps {
  id: string;
  name: string;
  price: string;
  quantity: string;
  image: string;
  manufacturer: string;
  category: string;
  status: string;
}

function Admin() {
  const [fields, setFields] = useState<FieldProps>({
    id: "",
    name: "",
    price: "",
    quantity: "",
    image: "",
    manufacturer: "",
    category: "",
    status: "",
  });

  const [itemList, setItemList] = useState<any>([]);
  const [styleNav, setStyleNav] = useState("add");
  const [popupViewStyle, setPopupViewStyle] = useState("offView");
  // const [imgName, setImgName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  // const [confirmEdit, setConfirmEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [keepAction, setKeepAction] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const resetFields = () => {
    const fieldAfterSubmit = {
      id: "",
      name: "",
      price: "",
      quantity: "",
      image: "",
      manufacturer: "",
      category: "",
      status: "",
    };
    setFields(fieldAfterSubmit);
  };

  // ===========================BODY EVENT===========================
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleChangeImage = (e: any) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setFields({
        ...fields,
        image: file.name,
      });
    }
  };

  // -------------------------------ADD ITEM-------------------------------
  const getValueToAdd = async (data: any) => {
    return handleSubmit(data);
  };
  const handleSubmit = async (newProduct: any) => {
    try {
      await PostData(newProduct);
      const newList = GetData();
      setItemList([...itemList, newList]);
    } catch (err) {
      console.error("Admin fail to add: ", err);
    }
    resetFields();
  };

  // -------------------------------DELETE ITEM-------------------------------
  const getIdOfDeleteItem = async (id: string) => {
    setSelectedId(id); //Get this Id from ProductList
    setConfirmDelete(true); //Confirm popup modal
    setPopupViewStyle("onView");
  };
  const acceptDel = (boolean: boolean) => {
    setKeepAction(boolean); //True here
    setConfirmDelete(!boolean);
    setPopupViewStyle("offView");
  };

  const cancleChange = (boolean: boolean) => {
    setConfirmDelete(boolean); //false here
    setOpenEdit(boolean);
    resetFields();
    setPopupViewStyle("offView");
    console.log("cancle success!");
  };

  useEffect(() => {
    if (!firstLoad) {
      if (keepAction) {
        handleDelete(selectedId);
      }
    } else {
      setFirstLoad(false);
    }
  }, [keepAction]);

  const handleDelete = async (idToDelete: string) => {
    try {
      await DeleteData(idToDelete);
      setItemList((prevList: any[]) =>
        prevList.filter((item: any) => item.id !== idToDelete)
      );
    } catch (err) {
      console.error("Admin file: ", err);
    }
  };

  // -------------------------------EDIT ITEM-------------------------------
  const getValueForEdit = async (id: string) => {
    setPopupViewStyle("onView");
    try {
      const latestData = await GetData();
      const selectedItem = latestData.find((item: any) => {
        return item.id === id;
      });
      if (selectedItem) {
        setOpenEdit(true);
        setFields(selectedItem);
      } else {
        console.error(`item with id ${id} not found`);
      }
    } catch (err) {
      console.error("admin failed edit", err);
    }
  }; //Get data, Open edit popup

  const confirmEditPop = async (boolean: boolean, id: string, data: any) => {
    setSelectedId(id);
    try {
      if (boolean) {
        await PutData(id, data);
        setPopupViewStyle("offView");
        setOpenEdit(!boolean);
        console.log("admin success update");
      } else {
        console.log("nothing");
      }
    } catch (err) {
      console.error("admin fail edit", err);
    }
  }; //Confirm edit popup

  // ===========================SIDEBAR EVENT===========================
  const [renderBody, setRenderBody] = useState(
    <Form
      fields={fields}
      handleOnChange={handleOnChange}
      handleChangeImage={handleChangeImage}
      sendValue={getValueToAdd}
    />
  );
  const handleList = () => {
    setStyleNav("list");
  };
  const handleAdd = () => {
    setStyleNav("add");
  };
  useEffect(() => {
    switch (styleNav) {
      case "add":
        setRenderBody(
          <Form
            fields={fields}
            handleOnChange={handleOnChange}
            handleChangeImage={handleChangeImage}
            sendValue={getValueToAdd}
          />
        );
        break;
      case "list":
        setRenderBody(
          <ProductList
            itemList={itemList}
            fields={fields}
            sendIdForDelete={getIdOfDeleteItem}
            sendValueForEdit={getValueForEdit}
          />
        );
        break;
      default:
        console.log("not yet");
    }
  }, [styleNav, fields, itemList]);

  // ===================GET AND RENDER===================
  useEffect(() => {
    const renderData = async () => {
      try {
        const data = await GetData();
        setItemList(data);
      } catch (err) {
        console.error("Render data: ", err);
      }
    };
    renderData();
  }, []);

  const renderTitle =
    styleNav === "add" ? "ADDING NEW PRODUCT" : "MANAGING LIST";

  return (
    <>
      <Sidebar
        handleList={handleList}
        handleAdd={handleAdd}
        styleNav={styleNav}
      />
      <Body
        popupViewStyle={popupViewStyle}
        styleNav={styleNav}
        renderTitle={renderTitle}
      >
        {renderBody}
      </Body>
      {/* DELETE POPUP */}
      {confirmDelete && (
        <ConfirmPop
          content="delete"
          selectedId={selectedId}
          acceptDel={acceptDel}
          cancle={cancleChange}
          // acceptEdit={acceptEdit}
        />
      )}
      {/* EDIT MODAL POPUP */}
      {openEdit && (
        <EditPop
          fields={fields}
          handleOnChange={handleOnChange}
          handleChangeImage={handleChangeImage}
          sendValue={getValueToAdd}
          confirmEditPop={confirmEditPop}
          cancleChange={cancleChange}
        />
      )}
      {/* {confirmEdit && (
        <ConfirmPop
          content="edit"
          selectedId={selectedId}
          acceptDel={acceptDel}
          cancle={cancleChange}
          acceptEdit={acceptEdit}
        />
      )} */}
    </>
  );
}

export default Admin;
