/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import "./confirmPop.scss";
import {
  deleteProduct,
  editProduct,
  fetchProducts,
} from "../../../redux/reducer/ProductsSlide";
import type { Product } from "../../../types/ProductType";

interface ConfirmPopProps {
  onCancle: () => void;
  onSubmitSuccess: () => void;
  mode: "delete" | "edit";
  selectedFields?: Product;
  selectedID?: string;
}

function ConfirmPop({
  onCancle,
  onSubmitSuccess,
  selectedID,
  selectedFields,
  mode,
}: ConfirmPopProps) {
  const dispatch = useDispatch<any>();

  const handleAcceptDelete = (id: string | undefined) => {
    if (id) {
      dispatch(deleteProduct(id))
        .then(() => {
          dispatch(fetchProducts());
          onSubmitSuccess();
          onCancle();
        })
        .catch((error: any) => {
          console.error("Error deleting product:", error);
        });
    } else {
      console.log("fail to accept delete");
    }
  };

  const handleAcceptEdit = (selectedFields: Product | undefined) => {
    if (selectedFields) {
      dispatch(editProduct(selectedFields))
        .then(() => {
          dispatch(fetchProducts());
          onCancle();
          onSubmitSuccess();
        })
        .catch((error: any) => {
          console.error("Error editing product:", error);
        });
    } else {
      console.log("fail to accept edit");
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
                ? handleAcceptDelete(selectedID)
                : handleAcceptEdit(selectedFields)
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

export default ConfirmPop;
