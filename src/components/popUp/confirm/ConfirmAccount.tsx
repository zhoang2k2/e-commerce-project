/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import "../confirm/confirmPop.scss";
import type { AccountType } from "../../../types/AccountType";
import {
  deleteAccount,
  editAccount,
  fetchAccounts,
} from "../../../redux/reducer/AccountsSlide";

type ConfirmmAccount = {
  onCancle: () => void;
  onSubmitSuccess: () => void;
  mode: "delete" | "edit";
  selectedAccount?: AccountType;
  selectedID?: string;
};

function ConfirmAccount({
  onCancle,
  onSubmitSuccess,
  selectedID,
  selectedAccount,
  mode,
}: ConfirmmAccount) {
  const dispatch = useDispatch<any>();

  const handleAcceptDelete = (id: string) => {
    if (id) {
      dispatch(deleteAccount(id))
        .then(() => {
          dispatch(fetchAccounts());
          onSubmitSuccess();
          onCancle();
        })
        .catch((error: any) => {
          console.error("Error deleting account:", error);
        });
    } else {
      console.log("fail to accept delete");
    }
  };

  const handleAcceptEdit = (selectedAccount: AccountType) => {
    if (selectedAccount) {
      dispatch(editAccount(selectedAccount))
        .then(() => {
          dispatch(fetchAccounts());
          onSubmitSuccess();
          onCancle();
        })
        .catch((error: any) => {
          console.error("Error editing account:", error);
        });
    } else {
      console.log(
        "Failed to accept edit: Selected account is null or undefined."
      );
    }
  };

  return (
    <div className="popup">
      <div className="wrapper">
        <div className="title">Warning!!</div>
        <div className="body">
          {mode === "delete" ? (
            <p>
              Are you sure to
              <br />
              <span> {mode}</span> item's ID: <span>{selectedID}</span>?
            </p>
          ) : (
            <p>Are you sure about saving this change?</p>
          )}
        </div>
        <div className="footer">
          <button
            className="confirm-btn"
            onClick={() =>
              mode === "delete"
                ? selectedID && handleAcceptDelete(selectedID)
                : selectedAccount && handleAcceptEdit(selectedAccount)
            }
          >
            Accept
          </button>
          <button className="deny-btn" onClick={onCancle}>
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAccount;
