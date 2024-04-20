import Loading from "../../Loading/Loading";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addAuthAccount } from "../../../redux/reducer/AuthAccountSlides";

type ConfirmLogoutProps = {
  onCancle: () => void;
};

function ConfirmLogout({ onCancle }: ConfirmLogoutProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setTimeout(() => {
      const removedAdmin = {
        email: "",
        password: "",
      };
      dispatch(addAuthAccount(removedAdmin));
      history.push("/");
    }, 2000);
  };

  return (
    <>
      <div className="popup">
        <div className="wrapper">
          <div className="title">Warning!!</div>
          <div className="body">
            <p>Are you sure about going to log out?</p>
          </div>
          <div className="footer">
            <button className="confirm-btn" onClick={handleClick}>
              {loading ? <Loading /> : <>Accept</>}
            </button>
            <button className="deny-btn" onClick={onCancle}>
              Cancle
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmLogout;
