import "./login-signup.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type SignupProps = {
  onCloseModal: () => void;
  handleMode: (param: string) => void;
};

function SignUp({ onCloseModal, handleMode }: SignupProps) {
  // const accountList = JSON.parse(localStorage.getItem("accounts")) || [];
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputVal, setInputVal] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // const navigate = useNavigate();

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //   if (confirmPassword === inputVal.password) {
    //     navigate("/login");
    //     const updateAccountList = [...accountList, inputVal];
    //     localStorage.setItem("accounts", JSON.stringify(updateAccountList));
    //     alert("Register Sucessfully");
    //   } else {
    //     return console.log("Check your password again");
    //   }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const changeMode = () => {
    handleMode("login");
  };

  return (
    <div className="form-container">
      <form>
        <FontAwesomeIcon icon={faXmark} onClick={onCloseModal} />
        <h2>Register System</h2>

        <label htmlFor="fullname">fullname</label>
        <input
          name="fullname"
          type="text"
          placeholder="Enter fullname"
          value={inputVal.fullname}
          onChange={handleChange}
        />

        <label htmlFor="email">email:</label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          value={inputVal.email}
          onChange={handleChange}
        />

        <label htmlFor="password">password:</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={inputVal.password}
          onChange={handleChange}
        />

        <label htmlFor="confirm-password">confirm password:</label>
        <input
          name="confirm-password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />

        <p>
          Already have account? <a onClick={changeMode}>login here</a>
        </p>
        <button onClick={handleRegister}>register</button>
      </form>
    </div>
  );
}

export default SignUp;
