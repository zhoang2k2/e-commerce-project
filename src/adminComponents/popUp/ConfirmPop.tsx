/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../form/Button";
import "./confirmPop.scss";

interface ConfirmPopProps {
  content: any;
  selectedId: string;
  acceptDel: (boolean: boolean) => void;
  cancleDel: (boolean: boolean) => void;
}

function ConfirmPop({ content, selectedId, ...props }: ConfirmPopProps) {
  const handleDel = () => {
    props.acceptDel(true);
  };
  const handleCancle = () => {
    props.cancleDel(false);
  };
  return (
    <div className="popup">
      <div className="wrapper">
        <div className="title">Warning!!</div>
        <div className="body">
          <p>
            Are you sure that you want to <span>{content}</span> item's ID:{" "}
            <span>{selectedId}</span>?
          </p>
        </div>
        <div className="footer">
          <Button
            className="confirm-btn"
            name="Continue"
            handleSubmit={handleDel}
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
