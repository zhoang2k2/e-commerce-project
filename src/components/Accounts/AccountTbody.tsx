import { useSelector } from "react-redux";
import { selectAccountState } from "../../redux/reducer/AccountsSlide";
import { useState } from "react";
import { createPortal } from "react-dom";
import Login from "../popUp/LoginSignup/Login";
import ConfirmAccount from "../popUp/Confirm/ConfirmAccount";
import EditAccount from "../popUp/EditAccount/EditAccount";
import type { AccountAuth, AccountType } from "../../types/AccountType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function AccountTbody() {
  const { adminAccounts } = useSelector(selectAccountState);

  const [showPopup, setShowPopup] = useState({
    auth: false,
    signup: false,
    confirm: false,
    edit: false,
  });

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

  const [authenticatedRow, setAuthenticatedRow] = useState<string>("");
  const [authForSetting, setAuthForSetting] = useState(false);

  const handleAuthorization = (account: AccountAuth) => {
    setAuthenticatedRow(account.id ?? "");

    setShowPopup({ ...showPopup, auth: true });
  };

  const handleCloseAuth = () => {
    setShowPopup({ ...showPopup, auth: false });
  };

  const handleCloseConfirmDelete = () => {
    setShowPopup({ ...showPopup, confirm: false });
  };
  const handleCloseEdit = () => {
    setShowPopup({ ...showPopup, edit: false });
  };

  return (
    <>
      <tbody>
        {adminAccounts.map((account) => {
          const isAuthRow = authenticatedRow === account.id;

          return (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.fullname}</td>
              <td>{account.gender}</td>
              <td>{account.birthday}</td>
              <td>{account.email}</td>
              <td>
                {isAuthRow && authForSetting ? (
                  account.password
                ) : (
                  <div className="verify">Verify for details</div>
                )}
              </td>
              <td>{account.phone}</td>
              <td>
                {isAuthRow && authForSetting ? (
                  account.address
                ) : (
                  <div className="verify">Verify for details</div>
                )}
              </td>
              <td>
                {!authForSetting && (
                  <button
                    className="auth-btn"
                    onClick={() =>
                      handleAuthorization({
                        id: account.id ?? "",
                        email: account.email,
                        password: account.password,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faLock} />
                  </button>
                )}

                {/* AFTER AUTHEN */}
                {isAuthRow && authForSetting && (
                  <>
                    <button
                      className="auth-btn"
                      onClick={() => setAuthForSetting(false)}
                    >
                      <FontAwesomeIcon icon={faLockOpen} />
                    </button>

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
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      {showPopup.auth &&
        createPortal(
          <Login
            mode="auth"
            extraMode="on-admin"
            onCloseModal={handleCloseAuth}
            onChangeMode={() => {}}
            authChecked={() => {
              handleCloseAuth;
              setAuthForSetting(true);
            }}
          />,
          document.body
        )}

      {showPopup.confirm &&
        createPortal(
          <ConfirmAccount
            mode="delete"
            onCancle={handleCloseConfirmDelete}
            onSubmitSuccess={() => setAuthForSetting(false)}
            selectedID={selectedID}
          />,
          document.body
        )}

      {showPopup.edit &&
        createPortal(
          <EditAccount
            initialFields={
              initialFields ?? {
                id: "",
                fullname: "",
                email: "",
                password: "",
                gender: "",
                phone: "",
                birthday: "",
                address: "",
              }
            }
            onClose={handleCloseEdit}
          />,
          document.body
        )}
    </>
  );
}

export default AccountTbody;
