/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const PutData = async (id: string, data: any) => {
  try {
    await axios.put(`http://localhost:3000/products/${id}`, data);
    console.log("success update");
  } catch (err) {
    console.log("fail to update", err);
  }
};
