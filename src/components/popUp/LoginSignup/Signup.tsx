import "./login-signup.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faEye,
  faEyeSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { addAccount } from "../../../redux/reducer/AccountsSlide";
import { useDispatch } from "react-redux";

type SignupProps = {
  onCloseModal: () => void;
  onChangeMode: () => void;
  onSubmitSuccess: () => void;
};

function SignUp({ onCloseModal, onChangeMode, onSubmitSuccess }: SignupProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputVal, setInputVal] = useState({
    id: "",
    fullname: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    address: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const [registerState, setRegisterState] = useState(false);
  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!registerState) {
      if (confirmPassword === inputVal.password) {
        const randomID = Math.floor(Math.random() * 10000);
        const updatedVal = { ...inputVal, id: randomID.toString() };
        if (updatedVal.id !== "") {
          await dispatch(addAccount(updatedVal));
          alert("Register Sucessfully");
          onSubmitSuccess();
          onCloseModal();
        }
      }
      setRegisterState(false);
    } else {
      window.alert("Your confirmation is different from password!!");
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
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

  const [signupStages, setSignupStages] = useState(1);
  const handleNextStage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignupStages(signupStages + 1);
  };
  const handlePrevStage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signupStages === 1 ? setSignupStages(1) : setSignupStages(signupStages - 1);
  };

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="form-container">
      <form className={showForm ? "active" : ""}>
        <FontAwesomeIcon
          className="close-icon"
          icon={faXmark}
          onClick={onCloseModal}
        />
        <h2>Register</h2>

        <div className="stages">
          <div className="stage1">
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className={signupStages === 1 ? "active-svg" : ""}
            />
            <div className={signupStages === 1 ? "active-stage" : ""}></div>
          </div>
          <div className="stage2">
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className={signupStages === 2 ? "active-svg" : ""}
            />
            <div className={signupStages === 2 ? "active-stage" : ""}></div>
          </div>
          <div className="stage3">
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className={signupStages === 3 ? "active-svg" : ""}
            />
            <div className={signupStages === 3 ? "active-stage" : ""}></div>
          </div>
        </div>

        {signupStages === 1 && (
          <div className="form-content">
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
          </div>
        )}

        {signupStages === 2 && (
          <div className="form-content">
            <label htmlFor="gender">
              Gender
              <select
                name="gender"
                value={inputVal.gender}
                onChange={handleChange}
              >
                <option value="prefer not to say">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
          </div>
        )}

        {signupStages === 3 && (
          <div className="form-content">
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
          </div>
        )}

        <p>
          Already have account? <a onClick={handleMode}>login here</a>
        </p>
        {signupStages === 3 ? (
          <div className="form-btns">
            <button className="prev-btn" onClick={handlePrevStage}>
              Move back
            </button>
            <button onClick={handleRegister} className="submit-btn">
              register
            </button>
          </div>
        ) : (
          <div className="form-btns">
            <button className="prev-btn" onClick={handlePrevStage}>
              Move back
            </button>
            <button className="next-btn" onClick={handleNextStage}>
              Forward
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SignUp;
