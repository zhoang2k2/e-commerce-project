import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./cart.scss";
import {
  faCheck,
  faMinus,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductInCart } from "../../../redux/reducer/CartSlide";
import {
  fetchAuthCustomer,
  selectAuthCustomerState,
} from "../../../redux/reducer/AuthCustomerSlide";
import { useEffect, useState } from "react";

import type { Product } from "../../../types/ProductType";
import { selectCustomerState } from "../../../redux/reducer/CustomerSlide";

type CartPopProps = {
  onClose: () => void;
};

function CartPop({ onClose }: CartPopProps) {
  const handCloseModal = () => {
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { currentCustomerAccount } = useSelector(selectAuthCustomerState);
  const { customerInfo } = useSelector(selectCustomerState);

  useEffect(() => {
    dispatch(fetchAuthCustomer());
  }, [dispatch]);

  const [cartById, setCartById] = useState<string>("");
  const [productInCart, setProductInCart] = useState<Product[]>([]);

  useEffect(() => {
    if (customerInfo && currentCustomerAccount) {
      const index = customerInfo.findIndex(
        (customer) => customer.id === currentCustomerAccount.id
      );
      if (index !== -1) {
        setProductInCart(customerInfo[index].products);
        setCartById(customerInfo[index].id);
      }
    }
  }, [customerInfo, currentCustomerAccount]);

  useEffect(() => {
    dispatch(fetchProductInCart(cartById));
  }, [dispatch]);

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
              <ul>
                {productInCart.map((item) => {
                  const formatCurrence = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(parseInt(item.price));
                  return (
                    <li key={item.id}>
                      <div className="sub-card-img">
                        <img src={item.image} alt="product-img" />
                      </div>

                      <div className="sub-card-title">
                        <h3>{item.name}</h3>
                        <p className="price">{formatCurrence}</p>
                        <p className="cat-breed">Kind: {item.catBreed}</p>
                        <p className="age">Age: {item.age} months</p>
                        <p className="color">Color: {item.color}</p>
                      </div>

                      <div className="sub-card-action">
                        <button className="increase-btn">
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button className="decrease-btn">
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <button className="delete-btn">
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>

                      <div className="total-item">x1</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPop;
