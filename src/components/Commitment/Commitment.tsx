import {
  faClockRotateLeft,
  faComments,
  faCreditCard,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./commitment.scss";

function Commitment() {
  return (
    <>
      <div className="commitment-container">
        <div className="commitment-card-wrapper">
          <div className="commitment-card">
            <FontAwesomeIcon icon={faTruck} />
            <h5>Fast & Free Delivery</h5>
            <p>Free delivery on all orders</p>
          </div>

          <div className="commitment-card">
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <h5>Online Support</h5>
            <p>Full time support for customer</p>
          </div>

          <div className="commitment-card">
            <FontAwesomeIcon icon={faComments} />
            <h5>Full consultation</h5>
            <p>Meets all needs</p>
          </div>

          <div className="commitment-card">
            <FontAwesomeIcon icon={faCreditCard} />
            <h5>Secure Payment</h5>
            <p>Secure for all payment types</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Commitment;
