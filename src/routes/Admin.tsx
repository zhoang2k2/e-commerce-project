import { ChangeEvent, useState } from "react";

import Form from "../adminComponents/form/Form";

interface FieldProps {
  id: string;
  name: string;
  price: number;
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
    manufacturer: "",
    category: "",
    status: "",
    image: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFields((prevField) => ({
      ...prevField,
      [id]: value,
    }));
  };

  return (
    <>
      <Form fields={fields} handleOnChange={handleOnChange} />
    </>
  );
}

export default Admin;
