import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./cart.scss";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductInCart } from "../../../redux/reducer/CartSlide";
import {
  fetchAuthCustomer,
  selectAuthCustomerState,
} from "../../../redux/reducer/AuthCustomerSlide";
import { useEffect, useState } from "react";

import type { Product } from "../../../types/ProductType";
import {
  fetchCustomerData,
  selectCustomerState,
  type CustomerInfo,
} from "../../../redux/reducer/CustomerSlide";
import CartItem from "../../PopUp/Cart/CartItem";

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
    dispatch(fetchCustomerData());
  }, [dispatch]);

  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [customerOnline, setCustomerOnline] = useState<CustomerInfo>();
  useEffect(() => {
    if (customerInfo.length > 0 && currentCustomerAccount) {
      const index = customerInfo.findIndex(
        (customer) => customer.id === currentCustomerAccount.id
      );
      if (index !== -1) {
        setProductsInCart(customerInfo[index].products);
        setCustomerOnline(customerInfo[index]);
        dispatch(fetchProductInCart(customerInfo[index].id));
      }
    }
  }, [customerInfo, currentCustomerAccount, dispatch]);

  // HANDLING QUANTITY
  const [productQuantities, setProductQuantities] = useState<{
    [key: string]: number;
  }>({});

  const handleIncrease = (productId: string) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const handleDecrease = (productId: string) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) - 1,
    }));
  };

  // HANDLING PURCHASE
  const totalPrice = productsInCart.reduce((total, product) => {
    const quantity = productQuantities[product.id] || 1;
    return total + parseInt(product.price) * quantity;
  }, 0);

  const totalPriceFormatCurrence = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalPrice);

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <>
      <div className="cart-container">
        <div className={showForm ? "cart-wrapper active" : "cart-wrapper"}>
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
              <div className="purchase">Total: {totalPriceFormatCurrence}</div>
              <button className="buy-btn">
                Buy <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
            <div className="cart-products">
              <ul>
                {productsInCart.map((item) => {
                  const formatCurrence = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(parseInt(item.price));

                  return (
                    <CartItem
                      handleIncrease={handleIncrease}
                      handleDecrease={handleDecrease}
                      quantity={productQuantities[item.id] || 1}
                      key={item.id}
                      formatCurrence={formatCurrence}
                      item={item}
                      customerOnline={
                        customerOnline ?? {
                          id: "",
                          username: "",
                          password: "",
                          products: [],
                        }
                      }
                    />
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
