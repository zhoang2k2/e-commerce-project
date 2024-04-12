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
    catBreed: "",
    age: "",
    color: "",
    rate: "",
    sales: "",
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleChangeImg = () => {
    console.log("img");
  };

  const handleRandomID = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomID = Math.floor(Math.random() * 10000);
    fields.id = randomID.toString();
    window.alert("Random ID success!");
  };

  // const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setFields((prevFields) => ({
  //     ...prevFields,
  //     color: prevFields.color,
  //   }));
  // };

  const [toggleState, setToggleState] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const handleCheckBoxChange = () => {
    setToggleBtn(!toggleBtn);
    setToggleState(!toggleState);
    setFields((prevFields) => ({
      ...prevFields,
      status: toggleBtn ? "1" : "0",
    }));
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
                disabled
              />
              {mode === "add" && (
                <button className="id-random-btn" onClick={handleRandomID}>
                  Get ID
                </button>
              )}
            </label>

            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                placeholder="Enter name..."
              />
            </label>

            <label htmlFor="catBreed">
              Cat breed:
              <input
                type="text"
                name="catBreed"
                value={fields.catBreed}
                onChange={handleChange}
                placeholder="Enter breed..."
              />
            </label>

            <label htmlFor="age">
              Age:
              <input
                type="number"
                name="age"
                value={fields.age}
                onChange={handleChange}
                placeholder="Enter age (by months)..."
              />
            </label>

            <label htmlFor="color">
              Color:
              <select name="color" value={fields.color} onChange={handleChange}>
                <option value="other">Other</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="gray">Gray</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="brown">Brown</option>
              </select>
            </label>

            <label htmlFor="price">
              Price:
              <input
                type="number"
                name="price"
                value={fields.price}
                onChange={handleChange}
                placeholder="Enter price..."
              />
            </label>

            <label htmlFor="quantity">
              Quantity:
              <input
                type="number"
                name="quantity"
                value={fields.quantity}
                onChange={handleChange}
                placeholder="Enter quantity..."
              />
            </label>

            <label htmlFor="rate">
              Rate:
              <select name="rate" value={fields.rate} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

            <label htmlFor="sales">
              Total Sales:
              <input
                type="text"
                name="sales"
                value={fields.sales}
                onChange={handleChange}
                placeholder="Enter sales number..."
              />
            </label>

            <label htmlFor="status" className="label-checkbox">
              Status:
              <div className="checkbox-container">
                <div className={toggleState ? "toggle-active" : "toggle-style"}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="status"
                    checked={toggleBtn}
                    value={fields.status}
                    onChange={handleCheckBoxChange}
                  />
                </div>
              </div>
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
