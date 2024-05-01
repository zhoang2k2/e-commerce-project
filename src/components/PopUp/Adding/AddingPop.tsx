import { useDispatch } from "react-redux";
import {
  addProduct,
  fetchProducts,
} from "../../../redux/reducer/ProductsSlide";
import { useState } from "react";
import type { Product } from "../../../types/ProductType";

import { createPortal } from "react-dom";
import Loading from "../../Loading/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConfirmPop from "../../PopUp/Confirm/ConfirmPop";
import "../../PopUp/Adding/addingPop.scss";

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

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialState || {
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
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "at least 2 characters")
        .max(50, "less than 50 characters")
        .required("required"),

      price: Yup.string()
        .min(5, "at least 5 characters")
        .max(50, "less than 50 characters")
        .required("required"),

      quantity: Yup.string()
        .min(1, "at least 1 characters")
        .max(50, "less than 50 characters")
        .required("required"),

      image: Yup.string().required("Required"),

      catBreed: Yup.string().required("Required"),

      age: Yup.string()
        .min(1, "at least 1 characters")
        .max(50, "less than 50 characters")
        .required("required"),

      color: Yup.string().required("Required"),

      rate: Yup.string().required("Required"),

      sales: Yup.string()
        .min(1, "at least 1 characters")
        .max(50, "less than 50 characters")
        .required("required"),

      status: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2400);

      if (mode === "add") {
        setTimeout(() => {
          const randomID = Math.floor(Math.random() * 10000);
          const updatedValues = { ...values, id: randomID.toString() };
          dispatch(addProduct(updatedValues)).then(() => {
            console.log("after");
            onSubmitSuccess();
            onCancle();
            dispatch(fetchProducts());
          });
        }, 2400);
      }

      if (mode === "edit") {
        setLoading(false);
        setModalEditConfirm(true);
      }
    },
  });

  const [modalEditConfirm, setModalEditConfirm] = useState(false);

  return (
    <>
      <div className="adding-popup">
        <div className="wrap-form">
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="name">
                Name:{" "}
                {formik.touched.name && formik.errors.name ? (
                  <div className="error">{formik.errors.name}</div>
                ) : null}
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Enter name..."
                />
              </label>

              <label htmlFor="catBreed">
                Cat breed:{" "}
                {formik.touched.catBreed && formik.errors.catBreed ? (
                  <div className="error">{formik.errors.catBreed}</div>
                ) : null}
                <input
                  type="text"
                  name="catBreed"
                  value={formik.values.catBreed}
                  onChange={formik.handleChange}
                  placeholder="Enter breed..."
                />
              </label>

              <label htmlFor="age">
                Age:{" "}
                {formik.touched.age && formik.errors.age ? (
                  <div className="error">{formik.errors.age}</div>
                ) : null}
                <input
                  type="number"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  placeholder="Enter age (by months)..."
                />
              </label>

              <label htmlFor="color">
                Color:{" "}
                {formik.touched.color && formik.errors.color ? (
                  <div className="error">{formik.errors.color}</div>
                ) : null}
                <select
                  name="color"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                >
                  <option value="">Other</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="gray">Gray</option>
                  <option value="orange">Orange</option>
                  <option value="yellow">Yellow</option>
                  <option value="brown">Brown</option>
                </select>
              </label>

              <label htmlFor="price">
                Price:{" "}
                {formik.touched.price && formik.errors.price ? (
                  <div className="error">{formik.errors.price}</div>
                ) : null}
                <input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  placeholder="Enter price..."
                />
              </label>

              <label htmlFor="quantity">
                Quantity:{" "}
                {formik.touched.quantity && formik.errors.quantity ? (
                  <div className="error">{formik.errors.quantity}</div>
                ) : null}
                <input
                  type="number"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  placeholder="Enter quantity..."
                />
              </label>

              <label htmlFor="rate">
                Rate:{" "}
                {formik.touched.rate && formik.errors.rate ? (
                  <div className="error">{formik.errors.rate}</div>
                ) : null}
                <select
                  name="rate"
                  value={formik.values.rate}
                  onChange={formik.handleChange}
                >
                  <option value="">Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>

              <label htmlFor="sales">
                Total Sales:{" "}
                {formik.touched.sales && formik.errors.sales ? (
                  <div className="error">{formik.errors.sales}</div>
                ) : null}
                <input
                  type="text"
                  name="sales"
                  value={formik.values.sales}
                  onChange={formik.handleChange}
                  placeholder="Enter sales number..."
                />
              </label>

              <label htmlFor="image">
                Image:{" "}
                {formik.touched.image && formik.errors.image ? (
                  <div className="error">{formik.errors.image}</div>
                ) : null}
                <input
                  className="product-image"
                  type="text"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  placeholder="Enter URL..."
                />
              </label>

              <label htmlFor="status">
                Status:{" "}
                {formik.touched.status && formik.errors.status ? (
                  <div className="error">{formik.errors.status}</div>
                ) : null}
                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <option value="">Version</option>
                  <option value="old">Old</option>
                  <option value="new">New</option>
                </select>
              </label>

              <div className="form-actions">
                <button className="save-btn" type="submit">
                  {loading && mode === "add" ? <Loading /> : <>Save</>}
                </button>
                <button className="cancle-btn" onClick={onCancle}>
                  Cancle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {modalEditConfirm &&
        createPortal(
          <ConfirmPop
            mode="edit"
            selectedFields={formik.values}
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
