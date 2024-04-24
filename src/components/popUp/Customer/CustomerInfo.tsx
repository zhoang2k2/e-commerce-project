import "./customer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import { useDispatch } from "react-redux";
import {
  addCustomerData,
  type CustomerInfo,
} from "../../../redux/reducer/CustomerSlide";

type CustomerAccountProps = {
  onClose: () => void;
  onCustomerRegisterSuccess: () => void;
  onChangeMode: () => void;
};

function CustomerAccount({ onClose, onChangeMode,onCustomerRegisterSuccess }: CustomerAccountProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const handleVisiblePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisiblePassword(!visiblePassword);
  };

  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("confirm", e.target.value);
  };

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: "",
      username: "",
      password: "",
      confirm: "",
      products: [],
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])/,
          "must contain at least 1 uppercase letter, 1 number, and no special icon"
        )
        .min(4, "at least 4 characters")
        .max(50, "less than 50 characters")
        .required("required"),

      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])/,
          "must contain at least 1 uppercase letter and 1 number"
        )
        .min(6, "at least 6 characters")
        .max(20, "less than 20 characters")
        .required("required"),

      confirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm related to your password"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2400);
      setTimeout(() => {
        const randomID = Math.floor(Math.random() * 10000);
        const { confirm, ...userData } = values;
        console.log(confirm);
        const updatedVal: CustomerInfo = {
          ...userData,
          id: randomID.toString(),
        };
        dispatch(addCustomerData(updatedVal));
        onClose();
        alert("Register Successfully");
        onCustomerRegisterSuccess()
      }, 2400);
    },
  });

  const handleChangeMode = () => {
    onChangeMode();
  };

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="customer-container">
      <div className={showForm ? "customer-pop active" : "customer-pop"}>
        <div className="customer-title">
          <h2>CUSTOMER INFORMATION</h2>
          <FontAwesomeIcon icon={faXmark} onClick={onClose} />
        </div>

        <div className="customer-body">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">
              Username:{" "}
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
              <input
                name="username"
                type="text"
                placeholder="Enter your username..."
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </label>

            <label htmlFor="password">
              Password:{" "}
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
              <input
                name="password"
                type={visiblePassword ? "text" : "password"}
                placeholder="Enter your password..."
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <button onClick={handleVisiblePassword}>
                {visiblePassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </label>

            <label htmlFor="confirm">
              Confirm:
              <input
                name="confirm"
                type="password"
                placeholder="Confirm password..."
                value={formik.values.confirm}
                onChange={handleConfirm}
              />
              {formik.touched.confirm && formik.errors.confirm ? (
                <div className="error">{formik.errors.confirm}</div>
              ) : null}
            </label>

            <p>
              Already have account? <a onClick={handleChangeMode}>login here</a>
            </p>

            <button type="submit" className="submit-btn">
              {loading ? <Loading /> : <>Register</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerAccount;
