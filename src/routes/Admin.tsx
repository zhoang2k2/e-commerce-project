/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";

import Form from "../adminComponents/form/Form";
import Sidebar from "../adminComponents/sidebar/sideBar";
import ProductList from "../adminComponents/table/Table";
import Body from "../adminComponents/body/Body";

interface FieldProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  manufacturer: string;
  category: string;
  status: string;
  image: string;
}

function Admin() {
  const [fields, setFields] = useState<FieldProps>({
    id: "",
    name: "",
    price: 0,
    quantity: 0,
    manufacturer: "",
    category: "",
    status: "",
    image: "",
  });

  const [itemList, setItemList] = useState<any>([]);

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

  return (
    <>
      <Sidebar />
      <Body>
        <Form
          fields={fields}
          handleOnChange={handleOnChange}
          handleChangeImage={handleChangeImage}
          handleSubmit={handleSubmit}
        />
        {/* <ProductList itemList={itemList} fields={fields} /> */}
      </Body>
    </>
  );
}

export default Admin;
