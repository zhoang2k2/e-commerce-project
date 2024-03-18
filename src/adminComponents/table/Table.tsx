/* eslint-disable @typescript-eslint/no-explicit-any */

import Tbody from "./Tbody";
import Thead from "./Thead";

import "./table.scss";

interface TableProps {
  itemList: Array<any>;
  fields: any;
  sendIdForDelete: (id: string) => void;
  sendValueForEdit: (id: string) => void;
}

function ProductList({ ...props }: TableProps) {
  return (
    <table>
      <Thead fields={props.fields} />
      <Tbody
        itemList={props.itemList}
        sendIdForDelete={props.sendIdForDelete}
        sendValueForEdit={props.sendValueForEdit}
      />
    </table>
  );
}

export default ProductList;
