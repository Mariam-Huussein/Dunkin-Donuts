import { useState, useMemo } from "react";
import MenuCard from "../../Components/Menu/MenuCard/MenuCard";
import "./Menu.css";
import menuItems from "../../../data/menu.json";
import SearchAndFilter from "../../Components/Menu/SearchAndFilter/SearchAndFilter";

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const allCategories = menuItems.flatMap((item) => item.category);
    const uniqueCategories = ["All", ...new Set(allCategories)];
    return uniqueCategories;
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems;

    if (activeCategory !== "All") {
      filtered = filtered.filter((item) =>
        item.category.includes(activeCategory),
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popularity":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, sortBy, activeCategory]);

  return (
    <div className="bg-light min-vh-100 p-5">
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
        Showing {filteredAndSortedItems.length} items
        {searchTerm && ` for "${searchTerm}"`}
        {activeCategory !== "All" && ` in ${activeCategory}`}
      </p>

      <div className="menu-grid px-3">
        {filteredAndSortedItems.length > 0 ? (
          filteredAndSortedItems.map((item) => (
            <MenuCard key={item.id} product={item} />
          ))
        ) : (
          <div className="text-center py-5 w-100">
            <p className="text-muted">No items found.</p>
            <button
              className="my-btn-primary"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
                setSortBy("name");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
