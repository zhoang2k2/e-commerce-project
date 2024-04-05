/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../../types/ProductType";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";
import { addProduct, fetchProducts } from "../../redux/reducer/ProductsSlide";

const AdminContext = createContext<{
  fields: Product;
  products: Product[];
  addingPopUp: boolean;
  handleOpenAdd: () => void;
  handleCancleAdd: () => void;
  handleAdd: () => void;
  handleChange: (e: any) => void;
}>({
  fields: {
    id: 0,
    name: "",
    price: "",
    quantity: "",
    image: "",
    manufacturer: "",
    category: "",
    status: "",
  },
  products: [],
  addingPopUp: false,
  handleOpenAdd: () => {},
  handleCancleAdd: () => {},
  handleAdd: () => {},
  handleChange: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fields, setFields] = useState<Product>({
    id: 0,
    name: "",
    price: "",
    quantity: "",
    image: "",
    manufacturer: "",
    category: "",
    status: "",
  });

  // const [loading, setLoading] = useState(false);
  // const [itemList, setItemList] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.getProducts.products
  );

  const resetFields = () => {
    const afterSubmit = {
      id: 0,
      name: "",
      price: "",
      quantity: "",
      image: "",
      manufacturer: "",
      category: "",
      status: "",
    };
    setFields(afterSubmit);
  };

  const [addingPopUp, setAddingPopUp] = useState(false);
  const handleOpenAdd = () => {
    setAddingPopUp(true);
  };

  const handleCancleAdd = () => {
    setAddingPopUp(false);
  };

  const handleAdd = () => {
    dispatch(addProduct(fields));
    resetFields();
    setAddingPopUp(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  // ===================DELETE PRODUCT===================

  // ===================GET AND RENDER===================
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <AdminContext.Provider
      value={{
        fields,
        products,
        addingPopUp,
        handleOpenAdd,
        handleCancleAdd,
        handleAdd,
        handleChange,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
