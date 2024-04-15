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
import EditAccount from "../popUp/EditAccount/EditAccount";
import type { AccountType } from "../../types/AccountType";
import ConfirmAccount from "../popUp/confirm/ConfirmAccount";

function AdminAccounts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const { accounts } = useSelector(selectAccountState);

  // const [fields, setFields] = useState<AccountType[]>([]);
  const [showPopup, setShowPopup] = useState({
    login: false,
    signup: false,
    confirm: false,
    edit: false,
  });

  const [reset, setReset] = useState(1);
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [reset]);

  const handleAddAccount = () => {
    setShowPopup({ ...showPopup, signup: true });
  };

  const [selectedID, setSelectedID] = useState("");
  const handleConfirmDelete = (id: string) => {
    setShowPopup({ ...showPopup, confirm: true });
    setSelectedID(id);
  };

  const [initialFields, setInitialFields] = useState<AccountType>();
  const handleOpenEdit = (selectedAccount: AccountType) => {
    setShowPopup({ ...showPopup, edit: true });
    setInitialFields(selectedAccount);
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
                    <button
                      className="edit-btn"
                      onClick={() => handleOpenEdit(account)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="del-btn"
                      onClick={() =>
                        account.id && handleConfirmDelete(account.id)
                      }
                    >
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
            onSubmitSuccess={() => setReset(reset + 1)}
            onCloseModal={() => setShowPopup({ ...showPopup, signup: false })}
            onChangeMode={() =>
              setShowPopup({ ...showPopup, signup: false, login: true })
            }
          />,
          document.body
        )}

      {showPopup.confirm &&
        createPortal(
          <ConfirmAccount
            mode="delete"
            onCancle={() => setShowPopup({ ...showPopup, confirm: false })}
            onSubmitSuccess={() => {}}
            selectedID={selectedID}
          />,
          document.body
        )}

      {showPopup.edit &&
        createPortal(
          <EditAccount
            initialFields={initialFields}
            onClose={() => setShowPopup({ ...showPopup, edit: false })}
          />,
          document.body
        )}
    </>
  );
}

export default AdminAccounts;
