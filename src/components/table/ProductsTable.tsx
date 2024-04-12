import { useSelector } from "react-redux";
import "./table.scss";
import type { Product } from "../../types/ProductType";
import { useEffect, useState, type ChangeEvent } from "react";
import { selectAdminState } from "../../redux/reducer/AdminSlide";
import AddingPop from "../popUp/adding/AddingPop";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpShortWide,
  faArrowUpWideShort,
  faMagnifyingGlass,
  faPlus,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import TitlePop from "../popUp/Title/TitlePop";
import Tbody from "./Tbody";
import Pagination from "../Pagination/Pagination";

function ProductsTable() {
  const [addModalVisible, setAddModelVisible] = useState(false);
  const [sortProducts, setSortProducts] = useState<Product[]>([]);
  const [sortStatus, setSortStatus] = useState("increase");

  const handleOpenAdd = () => {
    setAddModelVisible(true);
  };

  const { products } = useSelector(selectAdminState);

  const [filterVal, setFilterVal] = useState("");
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterVal(e.target.value);
  };
  const handleFilter = () => {
    const filterList = products.filter((filtered) => {
      return filtered.name.toLowerCase().includes(filterVal.toLowerCase());
    });
    setSortProducts(filterList);
    setCurrentPage(1);
  };

  // HANDLE SORT
  const handleSort = () => {
    const sorted = [...products].sort((a, b) => {
      const quantityA = parseInt(a.quantity);
      const quantityB = parseInt(b.quantity);
      return sortStatus === "decrease"
        ? quantityA - quantityB
        : quantityB - quantityA;
    });
    setSortProducts(sorted);
    setSortStatus(sortStatus === "increase" ? "decrease" : "increase");
  };

  useEffect(() => {
    setSortProducts(products);
  }, [products]);

  // HANDLE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const itemsPerPage = 5;

  const totalItem: Product[] = [...sortProducts];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems: Product[] = totalItem.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <div className="action-body">
        <div className="action-buttons">
          <button className="add-btn" onClick={handleOpenAdd}>
            <FontAwesomeIcon icon={faPlus} />
            adding
          </button>
          <button className="sort-btn" onClick={handleSort}>
            {sortStatus === "increase" ? (
              <FontAwesomeIcon icon={faArrowUpShortWide} />
            ) : (
              <FontAwesomeIcon icon={faArrowUpWideShort} />
            )}
          </button>
          <TitlePop title="Sort list by quantity" className="sort-title" />
        </div>
        <div className="search-action">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            placeholder="Search product's name"
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
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>image</th>
            <th>price</th>
            <th>quantity</th>
            <th>cat breed</th>
            <th>age</th>
            <th>color</th>
            <th>sales</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <Tbody currentItems={currentItems} filterVal={filterVal} />
      </table>

      <Pagination
        totalItem={totalItem}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {addModalVisible &&
        createPortal(
          <AddingPop
            onSubmitSuccess={() => {}}
            mode="add"
            onCancle={() => setAddModelVisible(false)}
          />,
          document.body
        )}
    </>
  );
}

export default ProductsTable;
