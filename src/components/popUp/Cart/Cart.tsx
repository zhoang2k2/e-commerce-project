import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./cart.scss";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductInCart,
  selectCartState,
} from "../../../redux/reducer/CartSlide";
import { selectAuthCustomerState } from "../../../redux/reducer/AuthCustomerSlide";
import { useEffect, useState } from "react";
import { fetchAuthAccount } from "../../../redux/reducer/AuthAccountSlides";
import type { Product } from "../../../types/ProductType";

type CartPopProps = {
  onClose: () => void;
};

function CartPop({ onClose }: CartPopProps) {
  const handCloseModal = () => {
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { customers } = useSelector(selectCartState);
  const { currentCustomerAccount } = useSelector(selectAuthCustomerState);

  useEffect(() => {
    dispatch(fetchAuthAccount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductInCart(currentCustomerAccount.id ?? ""));
  }, [dispatch, currentCustomerAccount]);

  const [productInCart, setProductInCart] = useState<Product[]>([]);

  useEffect(() => {
    if (customers && currentCustomerAccount) {
      const index = customers.findIndex(
        (customer) => customer.id === currentCustomerAccount.id
      );
      if (index !== -1) {
        setProductInCart(customers[index].products);
      }
    }
  }, [customers, currentCustomerAccount]);

  return (
    <>
      <div className="cart-container">
        <div className="cart-wrapper">
          <h2>CART</h2>
          <FontAwesomeIcon
            icon={faXmark}
            className="close-btn"
            onClick={handCloseModal}
          />
          <div className="cart-body">
            <div className="cart-info">
              <form>
                <label htmlFor="phone">
                  Phone:
                  <input
                    name="phone"
                    type="phone"
                    placeholder="Enter you phone number..."
                  />
                </label>

                <label htmlFor="address">
                  Address:
                  <input
                    name="address"
                    type="address"
                    placeholder="Enter you address..."
                  />
                </label>
              </form>
              <div className="price">
                <ul className="each-price">each</ul>
                <span className="total-price">total</span>
              </div>
              <button className="buy-btn">
                Buy <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
            <div className="cart-products">
              {productInCart.map((item) => {
                return <div key={item.id}>{item.name}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPop;
