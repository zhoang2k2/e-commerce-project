import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAccounts } from "../../redux/reducer/AccountsSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./accounts.scss";
import Login from "../popUp/LoginSignup/Login";
import { createPortal } from "react-dom";
import SignUp from "../popUp/LoginSignup/Signup";

import AccountTbody from "./AccountTbody";

function AdminAccounts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const [showPopup, setShowPopup] = useState({
    auth: false,
    login: false,
    signup: false,
    confirm: false,
    edit: false,
  });

  const [reset, setReset] = useState(1);
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [reset, dispatch]);

  const handleAddAccount = () => {
    setShowPopup({ ...showPopup, signup: true });
  };

  const handleCloseLogin = () => {
    setShowPopup({ ...showPopup, login: false });
  };
  const handleCloseSignup = () => {
    setShowPopup({ ...showPopup, signup: false });
  };

  const handleLoginToSignup = () => {
    setShowPopup({ ...showPopup, login: false, signup: true });
  };
  const handleSignupToLogin = () => {
    setShowPopup({ ...showPopup, signup: false, login: true });
  };

  return (
    <>
      <div className="accounts-container">
        <button className="add-btn" onClick={handleAddAccount}>
          <FontAwesomeIcon icon={faPlus} />
          Adding
        </button>

        <table className="accounts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fullname</th>
              <th>Gender</th>
              <th>Birthday</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <AccountTbody />
        </table>
      </div>

      {showPopup.login &&
        createPortal(
          <Login
            mode="login"
            onCloseModal={handleCloseLogin}
            onChangeMode={handleLoginToSignup}
            selectedAccount={{ id: "", email: "", password: "" }}
            authChecked={() => {}}
          />,
          document.body
        )}

      {showPopup.signup &&
        createPortal(
          <SignUp
            onSubmitSuccess={() => setReset(reset + 1)}
            onCloseModal={handleCloseSignup}
            onChangeMode={handleSignupToLogin}
          />,
          document.body
        )}
    </>
  );
}

export default AdminAccounts;
