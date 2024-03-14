/* eslint-disable @typescript-eslint/no-explicit-any */
import Tbody from "./Tbody";
import Thead from "./Thead";

import "./table.scss";

interface TableProps {
  itemList: Array<any>;
  fields: any;
  handleDel: (id: string) => void;
}

function ProductList({ itemList, fields, handleDel }: TableProps) {
  return (
    <table>
      <Thead fields={fields} />
      <Tbody itemList={itemList} handleDel={handleDel} />
    </table>
  );
}

export default ProductList;
