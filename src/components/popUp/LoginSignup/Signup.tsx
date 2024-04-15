import "./login-signup.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { addAccount } from "../../../redux/reducer/AccountsSlide";
import { useDispatch } from "react-redux";

type SignupProps = {
  onCloseModal: () => void;
  onChangeMode: () => void;
  onSubmitSuccess: () => void;
};

function SignUp({ onCloseModal, onChangeMode, onSubmitSuccess }: SignupProps) {
  // const accountList = JSON.parse(localStorage.getItem("accounts")) || [];
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputVal, setInputVal] = useState({
    id: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    address: "",
  });

  // const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirmPassword === inputVal.password) {
      const randomID = Math.floor(Math.random() * 10000);
      setInputVal({ ...inputVal, id: randomID.toString() });
      if (inputVal.id !== "") {
        dispatch(addAccount(inputVal));
        alert("Register Sucessfully");
        onSubmitSuccess();
        onCloseModal();
      }
    } else {
      window.alert("Your confirmation is different from password!!");
    }

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

  const handleMode = () => {
    onChangeMode();
  };

  const [visiblePassword, setVisiblePassword] = useState(false);
  const handleVisiblePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisiblePassword(!visiblePassword);
  };

  useEffect(() => {}, [inputVal]);

  return (
    <div className="form-container">
      <form>
        <FontAwesomeIcon
          className="close-icon"
          icon={faXmark}
          onClick={onCloseModal}
        />
        <h2>Register System</h2>

        <label htmlFor="fullname">
          fullname
          <input
            name="fullname"
            type="text"
            placeholder="Enter fullname..."
            value={inputVal.fullname}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email">
          email:
          <input
            name="email"
            type="email"
            placeholder="Enter email..."
            value={inputVal.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          password:
          <input
            name="password"
            type={visiblePassword ? "text" : "password"}
            placeholder="Enter password..."
            value={inputVal.password}
            onChange={handleChange}
          />
          <button onClick={handleVisiblePassword}>
            {visiblePassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </label>

        <label htmlFor="confirm-password">
          confirm password:
          <input
            name="confirm-password"
            type="password"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </label>

        <label htmlFor="phone">
          phone:
          <input
            name="phone"
            type="number"
            placeholder="Enter phonenumber..."
            value={inputVal.phone}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="birthday">
          birthday:
          <input
            name="birthday"
            type="date"
            value={inputVal.birthday}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="address">
          address:
          <input
            name="address"
            type="text"
            placeholder="Enter address..."
            value={inputVal.address}
            onChange={handleChange}
          />
        </label>

        <p>
          Already have account? <a onClick={handleMode}>login here</a>
        </p>
        <button onClick={handleRegister} className="submit-btn">
          register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
