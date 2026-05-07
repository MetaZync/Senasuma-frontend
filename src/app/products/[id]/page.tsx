"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import ProductDetailContent, { Product } from "./ProductDetailContent";
import CommonUsages from "./CommonUsages";
import CardSection from "../CardSection";
import { productUsagesById } from "./CommonUsageData";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/data/products.json");
        const data: Product[] = await response.json();
        const foundProduct = data.find((p) => p.id === Number(id));
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h4">Product not found</Typography>
        <Link href="/products" style={{ color: "#629474", textDecoration: "none" }}>
          Back to Products
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <ProductDetailContent product={product} />

      <CommonUsages usages={productUsagesById[product.id] || []} />

      <CardSection 
        hideFilters={true} 
        filterByType={product.category} 
        title="Related Products" 
        excludeId={product.id} 
      />
    </Box>
  );
}
