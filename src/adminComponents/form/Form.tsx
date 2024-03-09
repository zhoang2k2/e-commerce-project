import "./form.scss";
import { ChangeEvent } from "react";

interface FormProps {
  fields: {
    id: string;
    name: string;
    price: number;
    manufacturer: string;
    category: string;
    status: string;
    image: string;
  };
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Form({ fields, handleOnChange }: FormProps) {
  return (
    <form>
      <label htmlFor="product-id">
        ID:
        <input
          type="text"
          id="product-id"
          value={fields.id}
          onChange={handleOnChange}
        />
      </label>

      <label htmlFor="product-name">
        Name:
        <input
          type="text"
          id="product-name"
          value={fields.name}
          onChange={handleOnChange}
        />
      </label>

      <label htmlFor="product-price">
        Price:
        <input
          type="number"
          id="product-price"
          value={fields.price}
          onChange={handleOnChange}
        />
      </label>

      <label htmlFor="product-manufacturer">
        Manufacturer:
        <input
          type="text"
          id="product-manufacturer"
          value={fields.manufacturer}
          onChange={handleOnChange}
        />
      </label>

      <label htmlFor="product-category">
        Category:
        <input
          type="text"
          id="product-category"
          value={fields.category}
          onChange={handleOnChange}
        />
      </label>

      <label htmlFor="product-status">
        Status:
        <input
          type="text"
          id="product-status"
          value={fields.status}
          onChange={handleOnChange}
        />
      </label>

      {/* <label htmlFor="product-image">
        Image:
        <input
          type="file"
          id="product-image"
          value={fields.image}
          onChange={onChangeImage}
        />
      </label> */}
    </form>
  );
}

export default Form;
