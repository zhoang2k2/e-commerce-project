/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../form/Button";
import "./confirmPop.scss";

interface ConfirmPopProps {
  content: any;
  selectedId: string;
  // acceptEdit: (id: string, boolean?: boolean, data?: any) => void;
  acceptDel: (boolean: boolean) => void;
  cancle: (boolean: boolean) => void;
}

function ConfirmPop({ ...props }: ConfirmPopProps) {
  // const handleEdit = () => {
  //   props.acceptEdit(props.selectedId, true, undefined);
  // };
  const handleDel = () => {
    props.acceptDel(true);
  };

  const handleSubmit = () => {
    if (props.content === "edit") {
      // handleEdit();
    } else if (props.content === "delete") {
      handleDel();
    }
  };

  const handleCancle = () => {
    props.cancle(false);
  };

  return (
    <div className="popup">
      <div className="wrapper">
        <div className="title">Warning!!</div>
        <div className="body">
          <p>
            Are you sure that you want to <span>{props.content}</span> item's
            ID: <span>{props.selectedId}</span>?
          </p>
        </div>
        <div className="footer">
          <Button
            className="confirm-btn"
            name="Continue"
            handleSubmit={handleSubmit}
          />
          <Button
            className="deny-btn"
            name="Cancle"
            handleSubmit={handleCancle}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmPop;
