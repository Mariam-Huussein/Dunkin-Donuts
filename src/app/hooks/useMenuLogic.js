import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import menuItems from "../../data/menu.json";
import toast from "react-hot-toast";

export const useMenuLogic = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const CATEGORY_MAP = useMemo(
    () => ({
      COFFEE: "ESPRESSO & COFFEE",
      SANDWICHES: "SANDWICHES & MORE",
      SNACKS: "SNACKS & WRAPS",
    }),
    [],
  );

  // 1. Get all unique categories from JSON
  const categories = useMemo(() => {
    const allCategories = menuItems.flatMap((item) => item.category);
    return ["All", ...new Set(allCategories)];
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 2. Derive activeCategory from URL (The Source of Truth)
  const activeCategory = useMemo(() => {
    const catParam = searchParams.get("category");
    if (!catParam || catParam === "All") return "All";

    // Check mapping first, then check if it's a raw category name
    return (
      CATEGORY_MAP[catParam] ||
      (categories.includes(catParam) ? catParam : "All")
    );
  }, [searchParams, CATEGORY_MAP, categories]);

  // 3. Validation: If URL has garbage, clean it up
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (!catParam || catParam === "All") return;

    const isValid = CATEGORY_MAP[catParam] || categories.includes(catParam);

    if (!isValid) {
      toast.error(`Category "${catParam}" not found`, {
        id: "category-error",
      });
      setSearchParams({ category: "All" }, { replace: true });
    }
  }, [searchParams, CATEGORY_MAP, categories, setSearchParams]);

  // 4. Filtering & Sorting Logic
  const processedItems = useMemo(() => {
    let filtered = menuItems;
    if (activeCategory !== "All") {
      filtered = filtered.filter((item) =>
        item.category.includes(activeCategory),
      );
    }
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower),
      );
    }
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "popularity") return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, sortBy, activeCategory]);

  // 5. Pagination & Handlers
  useEffect(() => setCurrentPage(1), [searchTerm, sortBy, activeCategory]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedItems.slice(start, start + itemsPerPage);
  }, [processedItems, currentPage]);

  // Use this for MUI Select onChange
  const updateCategory = useCallback(
    (newCat) => {
      const urlKey =
        Object.keys(CATEGORY_MAP).find((key) => CATEGORY_MAP[key] === newCat) ||
        newCat;
      setSearchParams({ category: urlKey });
    },
    [CATEGORY_MAP, setSearchParams],
  );

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    activeCategory,
    updateCategory,
    categories,
    currentPage,
    totalPages: Math.ceil(processedItems.length / itemsPerPage),
    currentItems,
    totalItemsCount: processedItems.length,
    handlePageChange: (p) => {
      setCurrentPage(p);
      window.scrollTo(0, 0);
    },
    resetFilters: () => {
      setSearchTerm("");
      setSortBy("name");
      setSearchParams({ category: "All" });
    },
  };
};
