// import Login from "../popUp/LoginSignup/Login";
// import SignUp from "../popUp/LoginSignup/Signup";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  selectAccountState,
} from "../../redux/reducer/AccountsSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./accounts.scss";
import Login from "../popUp/LoginSignup/Login";
import { createPortal } from "react-dom";
import SignUp from "../popUp/LoginSignup/Signup";

function AdminAccounts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const { accounts } = useSelector(selectAccountState);

  // const [fields, setFields] = useState<AccountType[]>([]);
  const [showPopup, setShowPopup] = useState({
    login: false,
    signup: false,
  });

  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  const handleAddAccount = () => {
    setShowPopup({ ...showPopup, login: true });
  };

  // const autoNum = for(let i=1; i++) {}

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
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => {
              return (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.fullname}</td>
                  <td>{account.email}</td>
                  <td>{account.password}</td>
                  <td>{account.phone}</td>
                  <td>{account.address}</td>
                  <td>
                    <button className="edit-btn">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="del-btn">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showPopup.login &&
        createPortal(
          <Login
            onCloseModal={() => setShowPopup({ ...showPopup, login: false })}
            onChangeMode={() =>
              setShowPopup({ ...showPopup, login: false, signup: true })
            }
          />,
          document.body
        )}

      {showPopup.signup &&
        createPortal(
          <SignUp
            onCloseModal={() => setShowPopup({ ...showPopup, signup: false })}
            onChangeMode={() =>
              setShowPopup({ ...showPopup, signup: false, login: true })
            }
          />,
          document.body
        )}
    </>
  );
}

export default AdminAccounts;
