/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/Button";
import { selectAdminState } from "../../redux/reducer/AdminSlide";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  fetchProducts,
} from "../../redux/reducer/ProductsSlide";
import { createPortal } from "react-dom";
import AddingPop from "../popUp/adding/AddingPop";
import type { Product } from "../../types/ProductType";

function Tbody() {
  const dispatch = useDispatch();
  const [initialState, setInitialState] = useState<Product>();
  const [editModalVisible, setEditModelVisible] = useState(false);

  const { products } = useSelector(selectAdminState);
  const randomKey = () => Math.floor(Math.random() * 1000);

  const [reset, setReset] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [reset]);

  return (
    <>
      <tbody>
        {Array.isArray(products) &&
          products.map((product: any) => {
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
                  <Button
                    name="edit"
                    className="edit-btn"
                    handleSubmit={handleEditPop}
                  />
                </td>
                <td>
                  <Button
                    name="delete"
                    className="del-btn"
                    handleSubmit={handleDelete}
                  />
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
    </>
  );
}

export default Tbody;