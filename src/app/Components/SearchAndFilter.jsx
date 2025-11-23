import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  activeCategory,
  setActiveCategory,
  categories = [],
}) => {
  return (
    <Box
      sx={{
        p: 3,
        mb: 4,
        backgroundColor: "var(--white-color)",
        borderRadius: "var(--radius)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* 🔍 Search & Sort */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        {/* Search */}
        <TextField
          label="Search menu items..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: { xs: "100%", lg: "50%" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "var(--radius)",
              backgroundColor: "var(--white-color)",
              border: "1px solid var(--border)",
              transition: "border-color 0.3s, box-shadow 0.3s",
              "&:hover fieldset": {
                borderColor: "var(--secondary)",
                outlineColor: "var(--secondary)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--secondary)",
                outlineColor: "var(--secondary)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--gray-color)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--primary)",
            },
          }}
        />

        {/* Sort */}
        <FormControl
          sx={{
            width: { xs: "100%", lg: "auto" },
            minWidth: "200px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "var(--radius)",
              backgroundColor: "var(--white-color)",
              border: "1px solid var(--border)",
              "&:hover fieldset": {
                borderColor: "var(--secondary)",
                outlineColor: "var(--secondary)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--secondary)",
                outlineColor: "var(--secondary)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--gray-color)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--primary)",
            },
          }}
        >
          <InputLabel color="var(--gray-color)">Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl>

        {/* 🧁 Categories */}
        <FormControl
          sx={{
            width: { xs: "100%", lg: "auto" },
            minWidth: "200px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "var(--radius)",
              backgroundColor: "var(--white-color)",
              border: "1px solid var(--border)",
              "&:hover fieldset": {
                borderColor: "var(--secondary)",
                outlineColor: "var(--secondary)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--secondary)",
                outlineColor: "var(--secondary)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--gray-color)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--primary)",
            },
          }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={activeCategory}
            label="Category"
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SearchAndFilter;
