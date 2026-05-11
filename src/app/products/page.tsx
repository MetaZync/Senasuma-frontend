import { Box, CircularProgress } from "@mui/material";
import ProductsHero from "./ProductsHero";
import CardSection from "./CardSection";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <ProductsHero />
      <Suspense fallback={
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress color="success" />
        </Box>
      }>
        <CardSection />
      </Suspense>
    </Box>
  );
}
