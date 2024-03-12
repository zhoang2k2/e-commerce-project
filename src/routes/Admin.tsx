/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";

import Form from "../adminComponents/form/Form";
import Sidebar from "../adminComponents/sidebar/sideBar";
import ProductList from "../adminComponents/table/Table";
import Body from "../adminComponents/body/Body";

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

  const renderTitle =
    styleNav === "add" ? "ADDING NEW PRODUCT" : "MANAGING LIST";

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

  // ---------------BODY EVENT---------------
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setItemList((prevItemList: any[]) => [...prevItemList, fields]);
  };

  // ---------------SIDEBAR EVENT---------------
  const [renderBody, setRenderBody] = useState(
    <Form
      fields={fields}
      handleOnChange={handleOnChange}
      handleChangeImage={handleChangeImage}
      handleSubmit={handleSubmit}
    />
  );

  const handleList = (e: any) => {
    e.preventDefault();
    setStyleNav("list");
    return setRenderBody(<ProductList itemList={itemList} fields={fields} />);
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    setStyleNav("add");
    return setRenderBody(
      <Form
        fields={fields}
        handleOnChange={handleOnChange}
        handleChangeImage={handleChangeImage}
        handleSubmit={handleSubmit}
      />
    );
  };

  useEffect(() => {
    if (styleNav === "add") {
      setRenderBody(
        <Form
          fields={fields}
          handleOnChange={handleOnChange}
          handleChangeImage={handleChangeImage}
          handleSubmit={handleSubmit}
        />
      );
    } else if (styleNav === "list") {
      setRenderBody(<ProductList itemList={itemList} fields={fields} />);
    } else {
      console.log("wait");
    }
  }, [fields, handleChangeImage, handleOnChange]);

  return (
    <>
      <Sidebar
        handleList={handleList}
        handleAdd={handleAdd}
        styleNav={styleNav}
        styleNavOnView={styleNavOnView}
      />
      <Body titleByView={renderTitle}>{renderBody}</Body>
    </>
  );
}

export default Admin;
