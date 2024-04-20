import { useEffect, useState, type ChangeEvent } from "react";
import "./customer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMinus,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleleProductFromCart,
  fetchProductsFromCart,
  selectCartState,
} from "../../../redux/reducer/CartSlide";
import {
  fetchProducts,
  selectProductState,
} from "../../../redux/reducer/ProductsSlide";
import type { Product } from "../../../types/ProductType";

type CustomerInfoProps = {
  onClose: () => void;
};

function CustomerInfo({ onClose }: CustomerInfoProps) {
  const [inputVal, setInputVal] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { cart } = useSelector(selectCartState);
  const { products } = useSelector(selectProductState);
  useEffect(() => {
    dispatch(fetchProductsFromCart());
    dispatch(fetchProducts());
  }, [dispatch]);

  const matchedItems: Product[] = products.filter((product: Product) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cart.some((cartItem: any) => cartItem.productID === product.id);
  });

  const [total, setTotal] = useState(1);
  const handlePlus = () => {
    setTotal((prevTotal) => prevTotal + 1);
  };

  const handleMinus = (id: string) => {
    if (total === 1) {
      dispatch(deleleProductFromCart(id));
    } else {
      setTotal((prevTotal) => prevTotal - 1);
    }
  };

  return (
    <div className="customer-container">
      <div className="customer-pop">
        <div className="customer-title">
          <h2>CUSTOMER INFORMATION</h2>
          <FontAwesomeIcon icon={faXmark} onClick={onClose} />
        </div>

        <div className="customer-body">
          <form>
            <label htmlFor="name">
              Nick name:
              <input
                name="name"
                type="text"
                placeholder="Enter your nickname..."
                value={inputVal.name}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="phone">
              Phone:
              <input
                name="phone"
                type="text"
                placeholder="Enter phone number"
                value={inputVal.phone}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="address">
              Address:
              <input
                name="address"
                type="text"
                placeholder="Enter your address"
                value={inputVal.address}
                onChange={handleChange}
              />
            </label>

            <div className="total-price">You might pay:...</div>

            <button>
              BUY <FontAwesomeIcon icon={faCheck} />
            </button>
          </form>

          <div className="cart">
            <div className="products">
              {matchedItems &&
                matchedItems.map((item) => {
                  const formatCurrence = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(parseInt(item.price));
                  return (
                    <div key={item.id} className="product-in-cart">
                      <div className="card-img">
                        <img src={item.image} alt="ava" />
                      </div>
                      <div className="card-title">
                        <h4>{item.name}</h4>
                        <div>
                          <p>{item.catBreed}</p>
                          <p>color: {item.color}</p>
                        </div>
                        <p className="price">{formatCurrence}</p>
                      </div>
                      <div className="cart-action">
                        <button className="plus" onClick={handlePlus}>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button
                          className="minus"
                          onClick={() => handleMinus(item.id ?? "")}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="result-quantity">{total}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
