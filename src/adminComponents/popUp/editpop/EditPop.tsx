/* eslint-disable @typescript-eslint/no-explicit-any */

import "./editpop.scss";
import NewForm from "./newFormPop";

interface EditProps {
  fields: any;
  handleOnChange: (e: any) => void;
  handleChangeImage: (e: any) => void;
  sendValue: (e: any) => void;
  confirmEditPop: (boolean: boolean, id: string, data: any) => void;
  cancleChange: (boolean:boolean) => void
}

function EditPop({ ...props }: EditProps) {
  return (
    <div className="edit-popup">
      <div className="wrap-form">
        <NewForm
          fields={props.fields}
          handleOnChange={props.handleOnChange}
          handleChangeImage={props.handleChangeImage}
          confirmEditPop={props.confirmEditPop}
          cancleChange={props.cancleChange}
        />
      </div>
    </div>
  );
}

export default EditPop;
