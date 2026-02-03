import MenuCard from "../../Components/Menu/MenuCard/MenuCard";
import "./Menu.css";
import SearchAndFilter from "../../Components/Menu/SearchAndFilter/SearchAndFilter";
import { useMenuLogic } from "../../hooks/useMenuLogic";
import Pagination from "../../Components/Menu/Pagination/Pagination";

export default function MenuPage() {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    activeCategory,
    setActiveCategory,
    categories,
    currentItems,
    totalItemsCount,
    currentPage,
    totalPages,
    handlePageChange,
    resetFilters,
  } = useMenuLogic();

  return (
    <div className="bg-light min-vh-100 p-4 p-lg-4">
      <div className="text-center mb-5">
        <h1 className="title fw-bold">Our Menu</h1>
        <p className="text-muted fw-semibold">
          Discover our delicious selection of fresh, handcrafted meals and
          beverages
        </p>
      </div>

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />

      {/* Results */}
      <p className="text-muted mb-3">
        Showing {currentItems.length} of {totalItemsCount} items
        {searchTerm && ` for "${searchTerm}"`}
        {activeCategory !== "All" && ` in ${activeCategory}`}
      </p>

      <div className="menu-grid px-3">
        {currentItems.length > 0 ? (
          currentItems.map((item) => <MenuCard key={item.id} product={item} />)
        ) : (
          <div className="text-center py-5 w-100">
            <p className="text-muted">No items found.</p>
            <button
              className="my-btn-primary"
              onClick={() => {
                resetFilters();
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
