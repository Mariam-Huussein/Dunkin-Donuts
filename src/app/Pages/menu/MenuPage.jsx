import { useState, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MenuCard from "./../../Components/MenuCard";
import "./Menu.css";
import menuItems from "./../../../data/menu.json";

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const allCategories = menuItems.flatMap(item => item.category);
    const uniqueCategories = ["All", ...new Set(allCategories)]; 
    return uniqueCategories;
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems;

  if (activeCategory !== "All") {
    filtered = filtered.filter((item) => item.category.includes(activeCategory));
  }


    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="bg-light min-vh-100 py-5">
      {/* <Container> */}
        <div className="text-center mb-5">
          <h1 className="title fw-bold">Our Menu</h1>
          <p className="text-muted fw-semibold">
            Discover our delicious selection of fresh, handcrafted meals and
            beverages
          </p>
        </div>

        {/* Search and filter */}
        <div className="p-4 mb-4 bg-white shadow-sm rounded">
          <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-center">
            <Form.Control
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-100 w-lg-50"
            />

            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-100 w-lg-auto"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </Form.Select>
          </div>

          {/* Categories */}
          <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category ? "my-btn-primary" : "my-btn-outline"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-muted mb-3">
          Showing {filteredAndSortedItems.length} items
          {searchTerm && ` for "${searchTerm}"`}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>

        <div className="menu-grid">
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
      {/* </Container> */}
    </div>
  );
}
