/* eslint-disable @typescript-eslint/no-explicit-any */
import Tbody from "./Tbody";
import Thead from "./Thead";

import "./table.scss";

interface TableProps {
  itemList: Array<any>;
  fields: any;
}

function ProductList({ itemList, fields }: TableProps) {
  return (
    <table>
      <Thead fields={fields} />
      <Tbody itemList={itemList} />
    </table>
  );
}

export default ProductList;
