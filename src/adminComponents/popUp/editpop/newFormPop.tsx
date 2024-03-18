/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../form/Button";

// import { ChangeEvent } from "react";

interface NewFormProps {
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
  handleOnChange: (e: any) => void;
  handleChangeImage: (e: any) => void;
  confirmEditPop: (boolean: boolean, id: string, data: any) => void;
  cancleChange: (boolean: boolean) => void;
}

function NewForm({ fields, ...props }: NewFormProps) {
  const handleSaveClick = () => {
    props.confirmEditPop(true, fields.id, fields);
  };
  const handleCancleBtn = () => {
    props.cancleChange(false);
  };
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
          handleSubmit={handleSaveClick}
        />
        <Button
          name="Cancle"
          className="cancle-btn"
          handleSubmit={handleCancleBtn}
        />
      </section>
    </div>
  );
}

export default NewForm;
