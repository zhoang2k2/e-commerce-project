import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./login-signup.scss";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { AccountAuth } from "../../../types/AccountType";

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

  // const navigate = useNavigate();

  // const listAccount = JSON.parse(localStorage.getItem("accounts"));

  // const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   const loggedIn = listAccount.find(
  //     (account) =>
  //       account.email === inputVal.email &&
  //       account.password === inputVal.password
  //   );

  //   if (loggedIn) {
  //     alert("Login successfully");
  //     let userLogin = {
  //       Email: inputVal.email,
  //       Password: inputVal.password,
  //     };
  //     localStorage.setItem("user_login", JSON.stringify(userLogin));
  //     navigate("/account");
  //   } else {
  //     alert("Invalid email or password!");
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    mode === "auth" ? checkAuthorization() : console.log("this is login");
  };

  const handleMode = () => {
    onChangeMode();
  };

  return (
    <div className="form-container">
      <form>
        <FontAwesomeIcon
          className="close-icon"
          icon={faXmark}
          onClick={onCloseModal}
        />
        <h2>Login</h2>
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

        {mode === "login" && (
          <p>
            Not having any accounts yet? <a onClick={handleMode}>Register</a>
          </p>
        )}

        <button className="submit-btn" onClick={handleLogin}>
          login
        </button>
      </form>
    </div>
  );
}

export default Login;
