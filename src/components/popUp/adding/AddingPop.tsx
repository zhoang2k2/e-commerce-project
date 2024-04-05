/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../button/Button";
import { useAdminContext } from "../../context/AdminContext";
import "./addingPop.scss";

function AddingPop() {
  const { fields, handleChange, handleAdd, handleCancleAdd } =
    useAdminContext();

  return (
    <div className="adding-popup">
      <div className="wrap-form">
        <div className="form">
          <form>
            <label htmlFor="id">
              ID:
              <input
                type="text"
                name="id"
                value={fields.id}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="price">
              Price:
              <input
                type="number"
                name="price"
                value={fields.price}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="quantity">
              Quantity:
              <input
                type="number"
                name="quantity"
                value={fields.quantity}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="manufacturer">
              Manufacturer:
              <input
                type="text"
                name="manufacturer"
                value={fields.manufacturer}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="category">
              Category:
              <input
                type="text"
                name="category"
                value={fields.category}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="status">
              Status:
              <input
                type="text"
                name="status"
                value={fields.status}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="image">
              Image:
              <input
                className="product-image"
                type="file"
                name="image"
                value={fields.image}
                onChange={handleChange}
              />
            </label>
          </form>

          <textarea rows={20}></textarea>

          <section>
            <Button name="Save" className="save-btn" handleSubmit={handleAdd} />
            <Button
              name="Cancle"
              className="cancle-btn"
              handleSubmit={handleCancleAdd}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddingPop;
