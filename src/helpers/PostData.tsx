/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const PostData = async (data: any) => {
  try {
    await axios.post("http://localhost:3000/products/", data);
    console.log("Succescfully Add New Product");
  } catch (err) {
    console.error("Fail to Post", err);
  }
};
