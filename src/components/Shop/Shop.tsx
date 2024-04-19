import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./shop.scss";
import {
  faBoxOpen,
  faCartPlus,
  faClockRotateLeft,
  faComments,
  faCreditCard,
  faDollarSign,
  faMagnifyingGlass,
  faRankingStar,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProductState,
} from "../../redux/reducer/ProductsSlide";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Product } from "../../types/ProductType";
import Pagination from "../Pagination/Pagination";
import TitlePop from "../popUp/Title/TitlePop";

function Shop() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { products } = useSelector(selectProductState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // SORT HANDLING
  const [sortProducts, setSortProducts] = useState<Product[]>([]);
  const [sortStatus, setSortStatus] = useState("increase");

  const handleSort = (type: string) => {
    const sorted = [...products].sort((a, b) => {
      if (type === "price") {
        const priceA = parseInt(a.price);
        const priceB = parseInt(b.price);
        return sortStatus === "decrease" ? priceA - priceB : priceB - priceA;
      } else if (type === "rate") {
        const rateA = parseInt(a.rate);
        const rateB = parseInt(b.rate);
        return sortStatus === "decrease" ? rateA - rateB : rateB - rateA;
      }
      return 0;
    });
    setSortProducts(sorted);
    setSortStatus(sortStatus === "increase" ? "decrease" : "increase");
    setCurrentPage(1);
  };

  useEffect(() => {
    setSortProducts(products);
  }, [products]);

  // SEARCH HANDLIMG
  const [filterVal, setFilterVal] = useState("");
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterVal(e.target.value);
  };
  const handleFilter = () => {
    const filterList = products.filter((filtered) => {
      return (
        filtered.name.toLowerCase().includes(filterVal.toLowerCase()) ||
        filtered.catBreed.toLowerCase().includes(filterVal.toLowerCase()) ||
        filtered.status.toLowerCase().includes(filterVal.toLowerCase())
      );
    });
    setSortProducts(filterList);
    setCurrentPage(1);
  };

  // HANDLE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const [itemsPerPage] = useState(12);

  const totalItem: Product[] = [...sortProducts];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPage = Math.ceil(totalItem.length / itemsPerPage);

  const currentItems: Product[] = totalItem.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    window.scrollTo({
      top: 650,
      behavior: "smooth",
    });
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="shop-container">
        <div className="shop-banner">
          <div className="slides">
            <img src="https://i.imgur.com/w3vTUHj.jpeg" alt="banner 2" />
          </div>
        </div>

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

        <div className="shop-content">
          <h2>Da Katty Product</h2>
          <div className="shop-head">
            <div className="filter-btns">
              <button
                className="sort-by-price"
                onClick={() => handleSort("price")}
              >
                <FontAwesomeIcon icon={faDollarSign} />
              </button>
              <TitlePop title="Sort by price" className="price-title" />

              <button
                className="sort-by-rate"
                onClick={() => handleSort("rate")}
              >
                <FontAwesomeIcon icon={faRankingStar} />
              </button>
              <TitlePop title="Sort by rate" className="rate-title" />
            </div>
            <div className="search-product">
              <label>
                <input
                  onChange={handleFilterChange}
                  value={filterVal}
                  type="text"
                  placeholder="search your kitty"
                />
                <button onClick={handleFilter}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </label>
            </div>
          </div>
          <div className="shop-body">
            <div className="shop-product-list">
              {currentItems.map((product) => {
                const formatCurrence = new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(parseInt(product.price));

                const ratingStar = [];
                for (let i = 0; i < parseInt(product.rate); i++) {
                  ratingStar.push(<FontAwesomeIcon icon={faStar} key={i} />);
                }
                return (
                  <div className="product-card" key={product.id}>
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="add-to-cart"
                    />
                    <div
                      className="product-img"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    <div className="product-title">
                      <h3>{product.name}</h3>
                      <div className="rate">{ratingStar}</div>
                      <div className="sales">({product.sales} rated)</div>
                      <div className="price">{formatCurrence}</div>
                      <div className="quantity">
                        <FontAwesomeIcon icon={faBoxOpen} />
                        {product.quantity} left
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
              mode="full"
              totalPage={totalPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
