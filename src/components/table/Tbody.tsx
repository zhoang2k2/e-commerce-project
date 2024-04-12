/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../../redux/reducer/ProductsSlide";
import type { Product } from "../../types/ProductType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddingPop from "../popUp/adding/AddingPop";
import { createPortal } from "react-dom";

type TbodyProps = {
  currentItems: Product[];
  filterVal: string;
};

function Tbody({ currentItems, filterVal }: TbodyProps) {
  const dispatch = useDispatch();
  const randomKey = () => Math.floor(Math.random() * 100000);

  const [initialState, setInitialState] = useState<Product>();
  const [editModalVisible, setEditModelVisible] = useState(false);

  const [reset, setReset] = useState(1);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [reset]);

  useEffect(() => {});

  const columnSpan: number = 11;

  return (
    <>
      {currentItems.length === 0 ? (
        <tbody>
          <tr>
            <td colSpan={columnSpan}>
              Cannot find any product with the name of <span>{filterVal}</span>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {currentItems.map((product: Product) => {
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
                <td>
                  <img src={product.image} alt={`cat ${product.id}`} />
                </td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.catBreed}</td>
                <td>{product.age} months</td>
                <td>{product.color}</td>
                <td>{product.sales} sales</td>
                <td>{product.status === "0" ? "New" : "Old"}</td>
                <td>
                  <button className="edit-btn" onClick={handleEditPop}>
                    Edit
                  </button>
                  <button className="del-btn" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      )}

      {editModalVisible &&
        createPortal(
          <AddingPop
            initialState={initialState}
            mode="edit"
            onCancle={() => setEditModelVisible(false)}
            onSubmitSuccess={() => setReset((prev) => prev + 1)}
          />,
          document.body
        )}
    </>
  );
}

export default Tbody;
