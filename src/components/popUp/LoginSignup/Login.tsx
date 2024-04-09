import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./login-signup.scss";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type LoginProps = {
  onCloseModal: () => void;
  handleMode: (param: string) => void;
};

function Login({ onCloseModal, handleMode }: LoginProps) {
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  const changeMode = () => {
    handleMode("signup");
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

  //   useEffect(() => {
  //     let userLogin = JSON.parse(localStorage.getItem("user_login"));
  //     if (userLogin) {
  //       return navigate("/account");
  //     }
  //   }, []);

  const handleLogin = () => {
    console.log("login");
  };

  return (
    <div className="form-container">
      <form>
        <FontAwesomeIcon icon={faXmark} onClick={onCloseModal} />
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          onChange={handleChange}
          value={inputVal.email}
        />

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={inputVal.password}
        />

        <p>
          Not having account yet? <a onClick={changeMode}>Register</a>
        </p>

        <button onClick={handleLogin}>login</button>
      </form>
    </div>
  );
}

export default Login;
