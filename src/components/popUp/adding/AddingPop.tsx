import "./addingPop.scss";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../../redux/reducer/ProductsSlide";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Product } from "../../../types/ProductType";

type AddingPopProps = {
  initialState?: Product;
  mode?: "edit" | "add";
  onCancle: () => void;
  onSubmitSuccess: () => void;
};

function AddingPop({
  initialState,
  mode,
  onCancle,
  onSubmitSuccess,
}: AddingPopProps) {
  const dispatch = useDispatch();

  const [fields, setFields] = useState<Product>({
    id: "",
    name: "",
    price: "",
    quantity: "",
    image: "",
    manufacturer: "",
    category: "",
    status: "",
  });
  const handleAdd = () => {
    if (mode === "add") {
      dispatch(addProduct(fields));
      onCancle();
    } else {
      dispatch(editProduct(fields));
      onCancle();
      onSubmitSuccess();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleChangeImg = () => {
    console.log("img");
  };

  useEffect(() => {
    if (initialState) {
      setFields(initialState);
    }
  }, [initialState]);

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
                accept="image/*"
                value={fields.image}
                onChange={handleChangeImg}
              />
            </label>
          </form>

          <textarea rows={20}></textarea>

          <section>
            <button className="save-btn" onClick={handleAdd}>
              Save
            </button>
            <button className="cancle-btn" onClick={onCancle}>
              Cancle
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddingPop;
