import { useEffect, useState } from "react";
import "./editAccount.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { AccountType } from "../../../types/AccountType";
import ConfirmAccount from "../confirm/ConfirmAccount";

type EditAccountProps = {
  initialFields: AccountType | undefined;
  onClose: () => void;
};

function EditAccount({ onClose, initialFields }: EditAccountProps) {
  // const [visibleInputPassword, setVisibleInputPassword] = useState(true);
  // const handleChangePass = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setVisibleInputPassword(!visibleInputPassword);
  // };

  const handleCloseModal = () => {
    onClose();
  };

  const [inputVal, setInputVal] = useState({
    fullname: "",
    email: "",
    password: "",
    birthday: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    initialFields && setInputVal(initialFields);
  }, [initialFields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputVal((prevInputVal) => ({
      ...prevInputVal,
      [name]: value,
    }));
  };

  const [modalEditConfirm, setModalEditConfirm] = useState(false);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalEditConfirm(true);
  };

  return (
    <>
      <div className="edit-admin-container">
        <form>
          <FontAwesomeIcon
            icon={faXmark}
            className="close-icon"
            onClick={handleCloseModal}
          />
          <h2>
            Editing: <span>123@gmail.com</span>
          </h2>
          <div className="form-content">
            <div className="edit-information">
              <label htmlFor="fullname">
                fullname:
                <input
                  name="fullname"
                  type="text"
                  placeholder="Enter admin's name..."
                  value={inputVal.fullname}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="phone">
                phone:
                <input
                  name="phone"
                  type="number"
                  placeholder="Enter phone number..."
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
            </div>

            <div className="edit-login">
              {/* <div className="change-password-container">
                {visibleInputPassword ? (
                  <>
                    <button
                      className="change-password-btn"
                      onClick={handleChangePass}
                    >
                      Keep the previous password...
                    </button>

                    <label htmlFor="old password">
                      old password:
                      <input
                        name="old password"
                        type="text"
                        placeholder={inputVal.password}
                        disabled
                      />
                    </label>

                    <label htmlFor="new password">
                      new password:
                      <input
                        name="new password"
                        type="password"
                        placeholder="Enter new password..."
                      />
                    </label>

                    <label htmlFor="confirm new password">
                      confirm new password:
                      <input
                        name="confirm-password"
                        type="password"
                        placeholder="Confirm new password..."
                      />
                    </label>
                  </>
                ) : (
                  <button
                    className="change-password-btn"
                    onClick={handleChangePass}
                  >
                    Change my password
                  </button>
                )}
              </div> */}

              <button className="save-btn" onClick={handleEdit}>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      {modalEditConfirm && (
        <ConfirmAccount
          mode="edit"
          onCancle={() => setModalEditConfirm(false)}
          onSubmitSuccess={() => onClose()}
        />
      )}
    </>
  );
}

export default EditAccount;