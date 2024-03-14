/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useGetData() {
  const [products, getProducts] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        getProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getApi();
  }, []);
  return products;
}
export { useGetData };

function usePostData(data: any) {
  const postData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/products", data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  return postData;
}
export { usePostData };

function useDeleteData(id: string) {
  const delData = useCallback(async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/products/${id}`);
      return res;
    } catch (err) {
      console.error(err);
    }
  }, [id]);
  return delData;
}
export { useDeleteData };
