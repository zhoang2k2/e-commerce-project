/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useAdminContext } from "../context/AdminContext";
import Tbody from "./Tbody";
import Thead from "./Thead";

import "./table.scss";

function ProductList() {
  // const {  } = useAdminContext();
  return (
    <table>
      <Thead />
      <Tbody />
    </table>
  );
}

export default ProductList;
