"use client";

import React, { useState } from "react";
import { Box, Typography, Stack, IconButton, Pagination, Chip, Select, MenuItem, TextField, InputAdornment } from "@mui/material";
import { useSearchParams } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "./ProductCard";
import FadeIn from "@/components/FadeIn";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Product {
  id: number;
  title: string;
  tagline: string;
  mainDescription: string;
  short_description: string;
  image: string;
  category: string;
  type?: string | string[];
  ratingFromFive: number;
  regularPrice: number;
}

const categories = [
  "All",
  "Top",
  "Packaging",
  "Wrapping",
  "Industrial Supplies",
  "Bags",
  "Tapes",
  "Storage Containers",
  "Hardware",
  "Agricultural Supplies",
  "Home Decorations"
];

interface CardSectionProps {
  hideFilters?: boolean;
  filterByType?: string;
  title?: string;
  excludeId?: number;
}

export default function CardSection({ hideFilters, filterByType, title, excludeId }: CardSectionProps = {}) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeType, setActiveType] = useState(filterByType || categoryParam || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const itemsPerPage = 8;

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/data/products.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  React.useEffect(() => {
    if (categoryParam) {
      setActiveType(categoryParam);
      setPage(1);
    }
  }, [categoryParam]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const filteredProducts = products
    .filter((product) => {
      if (excludeId && product.id === excludeId) return false;
      const matchesType =
        activeType === "All" ||
        product.category.toLowerCase() === activeType.toLowerCase() ||
        (Array.isArray(product.type)
          ? product.type.some((t) => t.toLowerCase() === activeType.toLowerCase())
          : product.type?.toLowerCase() === activeType.toLowerCase());
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "priceLowHigh") return a.regularPrice - b.regularPrice;
      if (sortOption === "priceHighLow") return b.regularPrice - a.regularPrice;
      if (sortOption === "ratingLowHigh") return a.ratingFromFive - b.ratingFromFive;
      if (sortOption === "ratingHighLow") return b.ratingFromFive - a.ratingFromFive;
      return 0;
    });

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleSearch = () => {
    setSearchQuery(tempSearch);
    setPage(1);
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4, lg: 8 } }}>
      {!hideFilters && (
        <Stack
          component={FadeIn} delay={0.1}
          direction="row"
          sx={{
            justifyContent: { xs: "flex-start", md: "center" },
            overflowX: { xs: "auto", md: "visible" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            gap: { xs: 1, md: 1.5 },
            mb: { xs: 4, md: 6 },
            mx: { xs: -2, md: 0 },
            px: { xs: 2, md: 0 },
            pb: { xs: 1, md: 0 },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => {
                setActiveType(cat);
                setPage(1);
              }}
              sx={{
                backgroundColor: activeType === cat ? "#000000" : "#f0f0f0",
                fontFamily: poppins.style.fontFamily,
                fontSize: { xs: "12px", md: "14px" },
                px: { xs: 0.5, md: 1 },
                height: { xs: "32px", md: "40px" },
                borderRadius: "100px",
                flexShrink: 0,
                "& .MuiChip-label": {
                  fontWeight: activeType === cat ? 900 : 500,
                  background: activeType === cat
                    ? "linear-gradient(to right, #8DC38B, #527F65)"
                    : "transparent",
                  WebkitBackgroundClip: activeType === cat ? "text" : "none",
                  WebkitTextFillColor: activeType === cat ? "transparent" : "inherit",
                },
                "&:hover": {
                  backgroundColor: activeType === cat ? "#1a1a1a" : "#e0e0e0",
                },
              }}
            />
          ))}
        </Stack>
      )}

      {!hideFilters ? (
        <Box
          component={FadeIn} delay={0.2}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            mb: 8,
            maxWidth: "1820px",
            mx: "auto",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#7a7a7a",
                fontFamily: poppins.style.fontFamily,
              }}
            >
              Sort By :
            </Typography>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              variant="standard"
              disableUnderline
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: poppins.style.fontFamily,
                color: "#000000",
                "& .MuiSelect-select": {
                  py: 0.5,
                },
              }}
            >
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="ratingHighLow">High to Low Rated</MenuItem>
              <MenuItem value="ratingLowHigh">Low to High Rated</MenuItem>
              <MenuItem value="priceHighLow">High to Low Price</MenuItem>
              <MenuItem value="priceLowHigh">Low to High Price</MenuItem>
            </Select>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 700,
              color: "#000000",
              fontFamily: poppins.style.fontFamily,
              textAlign: "center",
            }}
          >
            {activeType}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "100px",
              padding: "4px 4px 4px 16px",
              width: { xs: "100%", md: "350px" },
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search products..."
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#7a7a7a", fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: {
                  fontSize: "14px",
                  fontFamily: poppins.style.fontFamily,
                },
              }}
            />
            <IconButton
              onClick={handleSearch}
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                borderRadius: "100px",
                padding: "8px 24px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: poppins.style.fontFamily,
                "&:hover": {
                  backgroundColor: "#1a1a1a",
                },
              }}
            >
              Search
            </IconButton>
          </Box>
        </Box>
      ) : title ? (
        <Typography
          component={FadeIn} delay={0.1}
          variant="h2"
          sx={{
            fontSize: { xs: "32px", md: "48px" },
            fontWeight: 500,
            color: "#000000",
            fontFamily: poppins.style.fontFamily,
            textAlign: "center",
            mb: 8
          }}
        >
          {title}
        </Typography>
      ) : null}

      <Box
        component={FadeIn}
        delay={0.3}
        width="100%"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 2, md: 4 },
          justifyItems: "center",
          maxWidth: "1820px",
          mx: "auto",
          width: "100%",
        }}
      >
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            mainDescription={product.mainDescription}
            short_description={product.short_description}
            tagline={product.tagline}
            image={product.image}
          />
        ))}
      </Box>

      <Box sx={{ mt: { xs: 8, md: 12 }, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          renderItem={({ color, page, selected, type, ...itemProps }) => (
            <IconButton
              {...itemProps}
              sx={{
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
                borderRadius: "50%",
                mx: 0.5,
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 600,
                fontFamily: poppins.style.fontFamily,
                backgroundColor: selected ? "#629474" : "#f0f0f0",
                color: selected ? "#ffffff" : "#000000",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: selected ? "#528464" : "#e0e0e0",
                },
                "&.Mui-disabled": {
                  opacity: 0.5,
                },
                visibility: type === 'page' || type === 'start-ellipsis' || type === 'end-ellipsis' ? 'visible' : 'hidden',
                display: type === 'page' || type === 'start-ellipsis' || type === 'end-ellipsis' ? 'inline-flex' : 'none',
              }}
            >
              {type === 'page' ? page : '...'}
            </IconButton>
          )}
        />
      </Box>
    </Box>
  );
}
