/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import "./table.scss";
import type { Product } from "../../types/ProductType";
import { useEffect, useState } from "react";
import { selectAdminState } from "../../redux/reducer/AdminSlide";
import {
  deleteProduct,
  fetchProducts,
} from "../../redux/reducer/ProductsSlide";
import AddingPop from "../popUp/adding/AddingPop";
import { createPortal } from "react-dom";
import type { RootState } from "../../redux/Store";
import { fetchThead } from "../../redux/reducer/TheadSlide";

function ProductsTable() {
  const dispatch = useDispatch();

  // ============TABLE HEAD LOGIC============
  const tHeadList = useSelector(
    (state: RootState) => state.getTheadItems.TheadItems
  );

  const newHeadItem = [
    {
      id: "9",
      thead: "edit",
    },
    {
      id: "10",
      thead: "delete",
    },
  ];
  const newItems = tHeadList.concat(newHeadItem);
  const tHeadItem = newItems.map((item) => <th key={item.id}>{item.thead}</th>);
  useEffect(() => {
    dispatch(fetchThead());
  }, []);

  // ============TABLE BODY LOGIC============
  const [initialState, setInitialState] = useState<Product>();
  const [editModalVisible, setEditModelVisible] = useState(false);

  const { products } = useSelector(selectAdminState);
  const randomKey = () => Math.floor(Math.random() * 1000);
  const [reset, setReset] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [reset]);

  return (
    <table>
      <thead>
        <tr>{tHeadItem}</tr>
      </thead>
      <tbody>
        {Array.isArray(products) &&
          products.map((product: Product) => {
            const key = randomKey();
            const handleDelete = () => {
              dispatch(deleteProduct(product.id));
              setReset((prev) => prev + 1);
            };

            const handleEditPop = () => {
              setEditModelVisible(true);
              setInitialState(product);
            };

            return (
              <tr key={key}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.image}</td>
                <td>{product.manufacturer}</td>
                <td>{product.category}</td>
                <td>{product.status}</td>
                <td>
                  <button className="edit-btn" onClick={handleEditPop}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="del-btn" onClick={handleDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>

      {editModalVisible &&
        createPortal(
          <AddingPop
            initialState={initialState}
            onCancle={() => setEditModelVisible(false)}
            onSubmitSuccess={() => setReset((prev) => prev + 1)}
          />,
          document.body
        )}
    </table>
  );
}

export default ProductsTable;
