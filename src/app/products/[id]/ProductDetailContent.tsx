"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Container,
  Rating,
} from "@mui/material";
import Image from "next/image";
import { Poppins } from "next/font/google";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StarIcon from "@mui/icons-material/Star";
import OrderButton from "@/components/Button";
import FadeIn from "@/components/FadeIn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export interface Product {
    id: number;
    title: string;
    tagline: string;
    type: string;
    material: string;
    cardDescription: string;
    mainDescription: string;
    ratingFromFive: number;
    ratingCount: number;
    neccessaryGoods: string[];
    regularPrice: number;
    wholeSalePrice: number;
    commonUsages: string[];
    image: string;
  }

import { necessaryGoodsIcons } from "./NecessaryGoodsData";
interface ProductDetailContentProps {
  product: Product;
}

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
  return (
    <Box sx={{ backgroundColor: "#ffffff", pt: { xs: 24, sm: 26, md: 20, lg: 24 }, pb: 8 }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8, lg: 12 }}
          alignItems="flex-start"
        >
          <FadeIn delay={0.1} style={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                borderRadius: { xs: "24px", md: "40px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                height: { xs: "320px", sm: "400px", md: "500px", lg: "600px" },
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </FadeIn>

          <FadeIn delay={0.2} style={{ flex: 1.2, width: "100%" }}>
          <Box sx={{ px: { xs: 1, sm: 0 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "28px", sm: "40px", md: "52px", lg: "64px" },
                fontWeight: 600,
                color: "#000000",
                fontFamily: poppins.style.fontFamily,
                mb: 1,
              }}
            >
              {product.title}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                color: "#000000",
                fontWeight: 400,
                fontFamily: poppins.style.fontFamily,
                mb: { xs: 2, md: 3 },
              }}
            >
              Material: {product.material}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                color: "#7a7a7a",
                lineHeight: 1.6,
                fontFamily: poppins.style.fontFamily,
                mb: { xs: 3, md: 4 },
                maxWidth: "600px",
              }}
            >
              {product.mainDescription}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent={{xs: "center", sm: "space-between"}}
              spacing={{ xs: 2, sm: 3 }}
              sx={{
                pb: 3,
                borderBottom: "1px solid #e0e0e0",
                mb: 4,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  {product.ratingCount} |
                </Typography>
                <Rating
                  value={product.ratingFromFive}
                  precision={0.5}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  sx={{ color: "#629474" }}
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#7a7a7a",
                    fontWeight: 500,
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  {product.ratingFromFive}/5
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", gap: 1 }}>
                {product.neccessaryGoods.map((tag, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "#629474",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "& svg": { fontSize: "24px" },
                    }}
                  >
                    {necessaryGoodsIcons[tag] || <ShoppingBagIcon />}
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Stack spacing={4} sx={{ maxWidth: "lg" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "20px", md: "24px" },
                    fontWeight: 600,
                    fontFamily: poppins.style.fontFamily,
                    mb: 1,
                  }}
                >
                  Regular Price
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  justifyContent="space-between"
                  gap={{ xs: 2, sm: 0 }}
                  sx={{ pb: 1, borderBottom: "1px solid #e0e0e0" }}
                >
                  <Stack direction="row" alignItems="baseline" spacing={1}>
                    <Typography
                      sx={{
                        fontSize: { xs: "28px", sm: "34px", md: "40px" },
                        fontWeight: 600,
                        background: "linear-gradient(to right, #8DC38B, #527F65)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      {product.regularPrice} LKR
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", md: "12px" },
                        color: "#7a7a7a",
                        fontWeight: 600,
                      }}
                    >
                      / Per 1000 pieces
                    </Typography>
                  </Stack>

                  <OrderButton
                    icon={<ShoppingBagIcon sx={{ fontSize: "16px" }} />}
                    sx={{
                      backgroundColor: "#000000 !important",
                      color: "#ffffff !important",
                      fontFamily: poppins.style.fontFamily,
                      height: "50px",
                      width: { xs: "auto", sm: "auto" },
                      minWidth: "200px",
                      fontSize: "14px",
                      borderRadius: "100px",
                    }}
                    onClick={() => window.location.href = `/products/${product.id}/place-order`}
                  >
                    Place Your Order
                  </OrderButton>
                </Stack>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "20px", md: "24px" },
                    fontWeight: 600,
                    fontFamily: poppins.style.fontFamily,
                    mb: 1,
                  }}
                >
                  Wholesale Price
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  justifyContent="space-between"
                  gap={{ xs: 2, sm: 0 }}
                  sx={{ pb: 1, borderBottom: "1px solid #e0e0e0" }}
                >
                  <Stack direction="row" alignItems="baseline" spacing={1}>
                    <Typography
                      sx={{
                        fontSize: { xs: "28px", sm: "34px", md: "40px" },
                        fontWeight: 600,
                        background: "linear-gradient(to right, #8DC38B, #527F65)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      {product.wholeSalePrice} LKR
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", md: "12px" },
                        color: "#7a7a7a",
                        fontWeight: 600,
                      }}
                    >
                      / Per 1000 pieces
                    </Typography>
                  </Stack>

                  <OrderButton
                    icon={<ShoppingBagIcon sx={{ fontSize: "16px" }} />}
                    sx={{
                      backgroundColor: "#629474 !important",
                      height: "50px",
                      width: { xs: "auto", sm: "auto" },
                      minWidth: "200px",
                      fontSize: "14px",
                      borderRadius: "100px",
                      fontFamily: poppins.style.fontFamily,
                      "& .MuiBox-root": { color: "#629474" },
                      "&:hover": { backgroundColor: "#528464 !important" },
                    }}
                    onClick={() => window.location.href = `/products/${product.id}/place-order`}
                  >
                    Order in Wholesale
                  </OrderButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
          </FadeIn>
        </Stack>
      </Container>
    </Box>
  );
}
