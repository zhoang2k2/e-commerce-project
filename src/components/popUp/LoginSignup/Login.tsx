import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./login-signup.scss";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { AccountAuth } from "../../../types/AccountType";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  selectAccountState,
} from "../../../redux/reducer/AccountsSlide";
import { addAuthAccount } from "../../../redux/reducer/AuthAccountSlides";
import { useFormik } from "formik";
import * as Yup from "yup";

type LoginProps = {
  onCloseModal: () => void;
  onChangeMode: () => void;
  authChecked: () => void;
  selectedAccount: AccountAuth;
  mode: "login" | "auth";
  extraMode: "on-admin" | "off-admin";
};

function Login({
  onCloseModal,
  onChangeMode,
  selectedAccount,
  authChecked,
  mode,
  extraMode,
}: LoginProps) {
  // ==========================LOGIN PART==========================
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { accounts } = useSelector(selectAccountState);
  const [accountList, setAccountList] = useState<AccountAuth[]>([]);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAccountList(accounts);
    }
  }, [accounts]);

  const [inputAuth] = useState<AccountAuth>({
    email: selectedAccount.email,
    password: selectedAccount.password,
  });

  const checkAuthorization = () => {
    if (formik.values.email && formik.values.password) {
      if (formik.values.email === inputAuth.email) {
        if (formik.values.password === inputAuth.password) {
          authChecked();
          onCloseModal();
        } else {
          window.alert("Wrong password!");
        }
      } else {
        window.alert("Wrong email!");
      }
    }
  };

  // =========================COMMON=========================
  const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    mode === "auth" ? checkAuthorization() : formik.handleSubmit();
  };

  const handleMode = () => {
    onChangeMode();
  };

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setShowForm(true);
  }, []);

  // =======================VALIDATE=======================
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .min(2, "at least 2 characters")
        .max(50, "less than 50 characters")
        .required("required"),

      password: Yup.string()
        .min(6, "at least 6 characters")
        .max(20, "less than 20 characters")
        .required("required"),
    }),
    onSubmit: async (value) => {
      let found = false;
      for (let i = 0; i <= accountList.length - 1; i++) {
        const checkAccountByIndex = accountList[i];
        if (value.email === checkAccountByIndex.email) {
          if (value.password === checkAccountByIndex.password) {
            found = true;
            onCloseModal();
            authChecked();
            dispatch(addAuthAccount(value));
            window.alert(`${checkAccountByIndex.email} login successfully`);
            return;
          } else {
            window.alert("wrong password!");
            return;
          }
        }
      }
      if (!found) {
        window.alert("wrong email!");
      }
    },
  });

  return (
    <div className="form-container">
      <form
        className={showForm ? "login-form active" : "login-form"}
        onSubmit={formik.handleSubmit}
      >
        <FontAwesomeIcon
          className="close-icon"
          icon={faXmark}
          onClick={onCloseModal}
        />
        <h2>Login</h2>
        <div className="form-content">
          <label htmlFor="email">
            Email:{" "}
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </label>

          <label htmlFor="password">
            Password:{" "}
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </label>
        </div>

        {mode === "login" && extraMode === "off-admin" && (
          <p>
            Not having accounts? <a onClick={handleMode}>Register here</a>
          </p>
        )}
        {mode === "auth" && extraMode === "on-admin" && (
          <p>
            For got password? <a>Click here</a>
          </p>
        )}
        <div className="form-btns">
          <button className="login-btn" onClick={handleLogin} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
