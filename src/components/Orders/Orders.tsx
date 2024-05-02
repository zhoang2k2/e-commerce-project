import { useDispatch, useSelector } from "react-redux";
import "./order.scss";
import {
  fetchOrder,
  selectOrderState,
  type CustomerOrder,
} from "../../redux/reducer/OrdersSlide";
import { useEffect, useState, type ChangeEvent } from "react";
import Pagination from "../Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faRotateLeft,
  faTags,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Orders() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { orders } = useSelector(selectOrderState);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  // HANDLE SEARCH
  const [currentItems, setCurrentItems] = useState<CustomerOrder[]>([]);
  const [filterVal, setFilterVal] = useState("");
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterVal(e.target.value);
  };

  const handleFilter = () => {
    const filterList = orders.filter((filtered) => {
      return (
        filtered.username.toLowerCase().includes(filterVal.toLowerCase()) ||
        filtered.phone.toLowerCase().includes(filterVal.toLowerCase()) ||
        filtered.id.toLowerCase().includes(filterVal.toLowerCase()) ||
        filtered.orderId.toLowerCase().includes(filterVal.toLowerCase())
      );
    });
    setCurrentItems(filterList);
    setCurrentPage(1);
  };

  // HANDLE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const [itemsPerPage] = useState(3);

  const totalItem = [...currentItems];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPage = Math.ceil(totalItem.length / itemsPerPage);

  const renderItems = totalItem.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (orders.length > 0) {
      setCurrentItems(orders);
    }
  }, [orders]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <>
      <div className="order-container">
        <div className="search-action">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            placeholder="Search orders..."
            value={filterVal}
            onChange={handleFilterChange}
          />
          <button className="search-btn" onClick={handleFilter}>
            {filterVal === "" ? (
              <FontAwesomeIcon icon={faRotateLeft} />
            ) : (
              <>Search</>
            )}
          </button>
        </div>

        <table className="products-table">
          <thead className="order-head">
            <tr>
              <th>Order ID</th>
              <th>Accounts</th>
              <th>Customer Info</th>
              <th>Orders</th>
              <th>In Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {renderItems.map((item) => {
              const totalPriceFormat = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(parseInt(item.inTotal));

              return (
                <tr key={item.orderId} className="order-tr">
                  <td className="orderId-col">{item.orderId}</td>

                  <td className="customer-col">
                    <ul>
                      <li>Customer ID: {item.id}</li>
                      <li>Username: {item.username}</li>
                      <li>Password: {item.password}</li>
                    </ul>
                  </td>

                  <td className="customer-col">
                    <ul>
                      <li>Phone: {item.phone}</li>
                      <li>Address: {item.address}</li>
                    </ul>
                  </td>

                  <td className="purchase-col">
                    <div className="purchase-cards-list">
                      {item.products.map((product) => {
                        const priceFormat = new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(parseInt(product.price));

                        const purchaseQuantity =
                          item.detailQuantities &&
                          item.detailQuantities.find((detail) => {
                            if (detail.productId === product.id) {
                              return detail.productQuantity;
                            }
                          });

                        return (
                          <div className="purchase-card" key={product.id}>
                            <div className="purchase-img">
                              <img src={product.image} alt="img" />
                            </div>
                            <div className="purchase-content">
                              <p>ID: {product.id}</p>
                              <p>Name: {product.name}</p>
                              <p>Price per unit: {priceFormat}</p>
                              <span>
                                x{" "}
                                {purchaseQuantity &&
                                  purchaseQuantity.productQuantity}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>

                  <td className="total-purchase-col">{totalPriceFormat}</td>

                  <td className="status-col">pending</td>

                  <td className="action-col">
                    <button className="status-btn">
                      <FontAwesomeIcon icon={faTags} />
                    </button>
                    <button className="edit-btn">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="del-btn">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          mode="full"
          totalPage={totalPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default Orders;
