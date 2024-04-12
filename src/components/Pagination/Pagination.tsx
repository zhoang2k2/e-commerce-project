import { useState } from "react";
import type { Product } from "../../types/ProductType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Pagination.scss";

type PaginationProps = {
  totalItem: Product[];
  itemsPerPage: number;
  onPageChange: (para: number) => void;
};

function Pagination({
  totalItem,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalItem.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage === totalPage ? totalPage : currentPage + 1);
    onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    onPageChange(currentPage - 1);
  };

  return (
    <>
      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => {
              setCurrentPage(index + 1);
              onPageChange(index + 1);
            }}
            className="active"
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  );
}

export default Pagination;
