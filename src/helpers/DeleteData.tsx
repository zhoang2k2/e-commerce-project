import axios from "axios";

export const DeleteData = async (id: string) => {
  try {
    await axios.delete(`http://localhost:3000/products/${id}`);
    console.log("Succescfully Delete");
  } catch (err) {
    console.error("Fail Delete: ", err);
  }
};
