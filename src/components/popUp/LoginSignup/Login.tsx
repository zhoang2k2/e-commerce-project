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

type LoginProps = {
  onCloseModal: () => void;
  onChangeMode: () => void;
  authChecked: () => void;
  selectedAccount: AccountAuth;
  mode: "login" | "auth";
};

function Login({
  onCloseModal,
  onChangeMode,
  selectedAccount,
  authChecked,
  mode,
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

  const handleCheckedAmin = () => {
    let found = false;
    for (let i = 0; i <= accountList.length - 1; i++) {
      const checkAccountByIndex = accountList[i];
      if (inputVal.email === checkAccountByIndex.email) {
        if (inputVal.password === checkAccountByIndex.password) {
          found = true;
          onCloseModal();
          authChecked();
          dispatch(addAuthAccount(inputVal));
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
  };

  // ==========================AUTH PART==========================
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  const [inputAuth] = useState<AccountAuth>({
    email: selectedAccount.email,
    password: selectedAccount.password,
  });

  const checkAuthorization = () => {
    if (inputVal.email === inputAuth.email) {
      if (inputVal.password === inputAuth.password) {
        authChecked();
        onCloseModal();
      } else {
        window.alert("Wrong password!");
      }
    } else {
      window.alert("Wrong email!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  // =========================COMMON=========================
  const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    mode === "auth" ? checkAuthorization() : handleCheckedAmin();
  };

  const handleMode = () => {
    onChangeMode();
  };

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="form-container">
      <form className={showForm ? "login-form active" : "login-form"}>
        <FontAwesomeIcon
          className="close-icon"
          icon={faXmark}
          onClick={onCloseModal}
        />
        <h2>Login</h2>
        <div className="form-content">
          <label htmlFor="email">
            Email:
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleChange}
              value={inputVal.email}
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              value={inputVal.password}
            />
          </label>
        </div>

        {mode === "login" && (
          <p>
            Not having any accounts yet? <a onClick={handleMode}>Register</a>
          </p>
        )}
        <div className="form-btns">
          <button className="login-btn" onClick={handleLogin}>
            login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
