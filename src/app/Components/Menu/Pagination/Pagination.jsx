import { getVisiblePages } from "../../../utils/getVisiblePages";
import "./Pagination.css"
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  const visiblePages = getVisiblePages({ currentPage, totalPages });

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-5 flex-wrap row-gap-4">
      {currentPage != 1 && (
        <button
          className="my-btn my-btn-outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
      )}

      {/* First page */}
      {visiblePages[0] > 1 && (
        <>
          <button
            className="my-btn btn-outline-primary"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          <span className="px-1">...</span>
        </>
      )}

      {/* Pages */}
      {visiblePages.map((number) => (
        <button
          key={number}
          className={`my-btn ${
            currentPage === number ? "my-btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* Last page */}
      {visiblePages.at(-1) < totalPages && (
        <>
          <span className="px-1">...</span>
          <button
            className="my-btn btn-outline-primary"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {currentPage != totalPages && (
        <button
          className="my-btn my-btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
