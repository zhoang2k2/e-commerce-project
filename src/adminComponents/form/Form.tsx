/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "./Button";
import "./form.scss";
import { ChangeEvent } from "react";

interface FormProps {
  fields: {
    id: string;
    name: string;
    price: string;
    quantity: string;
    image: string;
    manufacturer: string;
    category: string;
    status: string;
  };
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: any) => void;
}

function Form({ fields, ...props }: FormProps) {
  return (
    <div className="form">
      <form>
        <label htmlFor="id">
          ID:
          <input
            type="text"
            name="id"
            value={fields.id}
            onChange={props.handleOnChange}
          />
        </label>

        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={props.handleOnChange}
          />
        </label>

        <label htmlFor="price">
          Price:
          <input
            type="number"
            name="price"
            value={fields.price}
            onChange={props.handleOnChange}
          />
        </label>

        <label htmlFor="quantity">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={fields.quantity}
            onChange={props.handleOnChange}
          />
        </label>

        <label htmlFor="manufacturer">
          Manufacturer:
          <input
            type="text"
            name="manufacturer"
            value={fields.manufacturer}
            onChange={props.handleOnChange}
          />
        </label>

        <label htmlFor="category">
          Category:
          <input
            type="text"
            name="category"
            value={fields.category}
            onChange={props.handleOnChange}
          />
        </label>

        <label htmlFor="status">
          Status:
          <input
            type="text"
            name="status"
            value={fields.status}
            onChange={props.handleOnChange}
          />
        </label>

        <label htmlFor="image">
          Image:
          <input
            className="product-image"
            type="file"
            name="image"
            value={fields.image}
            onChange={props.handleChangeImage}
          />
        </label>
      </form>

      <textarea rows={20}></textarea>

      <section>
        <Button
          name="Save"
          className="save-btn"
          handleSubmit={props.handleSubmit}
        />
        <Button name="Cancle" className="cancle-btn" />
      </section>
    </div>
  );
}

export default Form;
