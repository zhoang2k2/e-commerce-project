import { useState } from "react";
import "./editAccount.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { AccountEditedType } from "../../../types/AccountType";
import ConfirmAccount from "../Confirm/ConfirmAccount";
import { useFormik } from "formik";
import * as Yup from "yup";

type EditAccountProps = {
  initialFields: AccountEditedType;
  onClose: () => void;
};

function EditAccount({ onClose, initialFields }: EditAccountProps) {
  const handleCloseModal = () => {
    onClose();
  };

  const [modalEditConfirm, setModalEditConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: initialFields && initialFields.id,
      fullname: initialFields && initialFields.fullname,
      password: initialFields && initialFields.password,
      email: initialFields && initialFields.email,
      gender: initialFields && initialFields.gender,
      phone: initialFields && initialFields.phone,
      birthday: initialFields && initialFields.birthday,
      address: initialFields && initialFields.address,
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(2, "at least 2 characters")
        .max(50, "less than 50 characters")
        .required("required"),

      gender: Yup.string().required("Required"),

      phone: Yup.string()
        .min(10, "at least 10 characters")
        .max(12, "less than 12 characters")
        .required("required"),

      birthday: Yup.date().required("Required"),

      address: Yup.string().required("Required"),
    }),
    onSubmit: () => {
      setModalEditConfirm(true);
    },
  });

  return (
    <>
      <div className="edit-admin-container">
        <form onSubmit={formik.handleSubmit}>
          <FontAwesomeIcon
            icon={faXmark}
            className="close-icon"
            onClick={handleCloseModal}
          />
          <h2>
            <span>{formik.values.email}</span>
          </h2>
          <div className="form-content">
            <div className="edit-information">
              <label htmlFor="fullname">
                fullname:{" "}
                {formik.touched.fullname && formik.errors.fullname ? (
                  <div className="error">{formik.errors.fullname}</div>
                ) : null}
                <input
                  name="fullname"
                  type="text"
                  placeholder="Enter admin's name..."
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                />
              </label>

              <label htmlFor="phone">
                phone:{" "}
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : null}
                <input
                  name="phone"
                  type="text"
                  placeholder="Enter your phone number..."
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </label>

              <label htmlFor="gender">
                Gender:{" "}
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="error">{formik.errors.gender}</div>
                ) : null}
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <option value="prefer not to say">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              <label htmlFor="birthday">
                birthday:{" "}
                {formik.touched.birthday && formik.errors.birthday ? (
                  <div className="error">{formik.errors.birthday}</div>
                ) : null}
                <input
                  name="birthday"
                  type="date"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                />
              </label>

              <label htmlFor="address">
                address:{" "}
                {formik.touched.address && formik.errors.address ? (
                  <div className="error">{formik.errors.address}</div>
                ) : null}
                <input
                  name="address"
                  type="text"
                  placeholder="Enter address..."
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </label>

              <button className="save-btn" type="submit">
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
          selectedAccount={formik.values}
        />
      )}
    </>
  );
}

export default EditAccount;
