import axios from "axios";

export const GetData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    const products = response.data;
    return products;
  } catch (err) {
    console.error("get data: ", err);
  }
};
