/* eslint-disable @typescript-eslint/no-explicit-any */
import Tbody from "./Tbody";
import Thead from "./Thead";

import "./table.scss";

interface TableProps {
  itemList: Array<any>;
  fields: any;
  sendIdForDelete: (id: string) => void;
}

function ProductList({ itemList, fields, sendIdForDelete }: TableProps) {
  return (
    <table>
      <Thead fields={fields} />
      <Tbody itemList={itemList} sendIdForDelete={sendIdForDelete} />
    </table>
  );
}

export default ProductList;
