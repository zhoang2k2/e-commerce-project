/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";
import Form from "../adminComponents/form/Form";
import Sidebar from "../adminComponents/sidebar/sideBar";
import ProductList from "../adminComponents/table/Table";
import Body from "../adminComponents/body/Body";
import { GetData } from "../helpers/GetData";
import { DeleteData } from "../helpers/DeleteData";
import { PostData } from "../helpers/PostData";
import ConfirmPop from "../adminComponents/popUp/ConfirmPop";

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
  const styleNavOnView = {
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
  const renderTitle =
    styleNav === "add" ? "ADDING NEW PRODUCT" : "MANAGING LIST";

  const [popupViewStyle, setPopupViewStyle] = useState("offView");
  const styleWhilePopup = {
    whilePopUp: {
      filter: "blur(2px)",
    },
    notPopUp: {
      filter: "blur(0px)",
    },
  };

  const [selectedId, setSelectedId] = useState("");
  // const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [keepAction, setKeepAction] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const resetField = () => {
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
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
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
    resetField();
  };

  // -------------------------------DELETE ITEM-------------------------------
  const getIdOfDeleteItem = async (id: string) => {
    setSelectedId(id); //Get this Id from ProductList
    setOpenDelete(true); //Open popup modal
    setPopupViewStyle("onView");
  };
  const acceptDel = (boolean: boolean) => {
    setKeepAction(boolean); //True here
    setOpenDelete(!boolean);
    setPopupViewStyle("offView");
  };

  const cancleDel = (boolean: boolean) => {
    setOpenDelete(boolean);
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
    if (styleNav === "add") {
      setRenderBody(
        <Form
          fields={fields}
          handleOnChange={handleOnChange}
          handleChangeImage={handleChangeImage}
          sendValue={getValueToAdd}
        />
      );
    } else if (styleNav === "list") {
      setRenderBody(
        <ProductList
          itemList={itemList}
          fields={fields}
          sendIdForDelete={getIdOfDeleteItem}
        />
      );
    } else {
      console.log("all");
    }
  }, [styleNav, fields, itemList]);

  // ===================GET AND RENDER API===================
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

  return (
    <>
      <Sidebar
        handleList={handleList}
        handleAdd={handleAdd}
        styleNav={styleNav}
        styleNavOnView={styleNavOnView}
      />
      <Body
        styleWhilePopup={styleWhilePopup}
        popupViewStyle={popupViewStyle}
        titleByView={renderTitle}
      >
        {renderBody}
      </Body>
      {/* {openEdit && <ConfirmPop content="edit" />} */}
      {openDelete && (
        <ConfirmPop
          content="delete"
          selectedId={selectedId}
          acceptDel={acceptDel}
          cancleDel={cancleDel}
        />
      )}
    </>
  );
}

export default Admin;
