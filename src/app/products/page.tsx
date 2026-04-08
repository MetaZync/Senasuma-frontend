import { Box } from "@mui/material";
import ProductsHero from "./ProductsHero";
import CardSection from "./CardSection";

export default function ProductsPage() {
  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <ProductsHero />
      <CardSection />
    </Box>
  );
}
