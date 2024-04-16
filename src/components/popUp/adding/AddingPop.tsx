import "./addingPop.scss";
import { useDispatch } from "react-redux";
import {
  addProduct,
  fetchProducts,
} from "../../../redux/reducer/ProductsSlide";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Product } from "../../../types/ProductType";
import TitlePop from "../Title/TitlePop";
import ConfirmPop from "../Confirm/ConfirmPop";
import { createPortal } from "react-dom";

type AddingPopProps = {
  initialState?: Product;
  mode?: "edit" | "add";
  onCancle: () => void;
  onSubmitSuccess: () => void;
  onClose: () => void;
};

function AddingPop({
  initialState,
  mode,
  onCancle,
  onSubmitSuccess,
  onClose,
}: AddingPopProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

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

  const [addState, setAddState] = useState(false);
  const handleAdd = async () => {
    if (!addState && mode === "add") {
      setAddState(true);
      const randomID = Math.floor(Math.random() * 10000);
      const updatedFields = { ...fields, id: randomID.toString() };
      if (updatedFields.id !== "") {
        await dispatch(addProduct(updatedFields));
        onSubmitSuccess();
        onCancle();
        dispatch(fetchProducts());
      }
      setAddState(false);
    } else if (mode === "edit") {
      setModalEditConfirm(true);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  // const handleRandomID = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   const randomID = Math.floor(Math.random() * 10000);
  //   fields.id = randomID.toString();
  //   window.alert("Get ID successfully!");
  // };

  useEffect(() => {
    if (initialState) {
      setFields(initialState);
    }
  }, [initialState]);

  const [modalEditConfirm, setModalEditConfirm] = useState(false);

  return (
    <>
      <div className="adding-popup">
        <div className="wrap-form">
          <div className="form">
            <form>
              {/* <label htmlFor="id">
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
              </label> */}

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
                <select
                  name="color"
                  value={fields.color}
                  onChange={handleChange}
                >
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
                  <option value=""></option>
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

              <label htmlFor="image">
                <a href="https://imgur.com/a/PiSwOET" target="_blank">
                  Image:
                </a>
                {/* CSS HOVER */}
                <TitlePop title="Image Source" className="image-source-title" />
                <input
                  className="product-image"
                  type="text"
                  name="image"
                  value={fields.image}
                  onChange={handleChange}
                  placeholder="Enter URL..."
                />
              </label>

              <label htmlFor="status">
                Status:
                <select
                  name="status"
                  value={fields.status}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="old">Old</option>
                  <option value="new">New</option>
                </select>
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

      {modalEditConfirm &&
        createPortal(
          <ConfirmPop
            mode="edit"
            selectedFields={fields}
            onCancle={() => {
              setModalEditConfirm(false);
            }}
            onSubmitSuccess={() => onClose()}
          />,
          document.body
        )}
    </>
  );
}

export default AddingPop;
