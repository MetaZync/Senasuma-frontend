"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Container,
  Rating,
  Modal,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { Poppins } from "next/font/google";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StarIcon from "@mui/icons-material/Star";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import OrderButton from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import CircularProgress from "@mui/material/CircularProgress";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export interface ProductOption {
  size: string;
  regularPrice: number;
  wholeSalePrice: number;
  special_notes?: string;
  image?: string;
}

export interface Product {
  id: number;
  title: string;
  product_name?: string;
  tagline: string;
  category: string;
  sub_category?: string;

  mainDescription: string;
  short_description?: string;
  features?: {
    material?: string;
    durability?: string;
    waterproof?: string;
    customizable?: string;
    transparency?: string;
    [key: string]: string | undefined;
  };
  commonUsages?: string[];
  ratingFromFive: number;
  ratingCount: number;
  neccessaryGoods: string[];
  regularPrice: number;
  wholeSalePrice: number;
  image: string;
  pdf?: string;
  options: ProductOption[];
}

import { necessaryGoodsIcons } from "./NecessaryGoodsData";
interface ProductDetailContentProps {
  product: Product;
}

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [selectedSize, setSelectedSize] = React.useState(product.options?.[0] || { size: "Default", regularPrice: product.regularPrice, wholeSalePrice: product.wholeSalePrice, image: "" });
  const [currentImage, setCurrentImage] = React.useState(product.image);
  const [pdfOpen, setPdfOpen] = React.useState(false);
  const [pdfError, setPdfError] = React.useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = React.useState(false);

  const handleOpenPdf = async () => {
    if (!product.pdf) return;
    setIsLoadingPdf(true);
    setPdfOpen(true);
    try {
      const response = await fetch(product.pdf, { method: "HEAD" });
      if (response.ok) {
        setPdfError(false);
      } else {
        setPdfError(true);
      }
    } catch {
      setPdfError(true);
    } finally {
      setIsLoadingPdf(false);
    }
  };

  React.useEffect(() => {
    if (product.options && product.options.length > 0) {
      setSelectedSize(product.options[0]);
    }
    setCurrentImage(product.image);
  }, [product]);

  React.useEffect(() => {
    if (selectedSize.image && selectedSize.image.trim() !== "") {
      setCurrentImage(selectedSize.image);
    } else {
      setCurrentImage(product.image);
    }
  }, [selectedSize, product.image]);

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
                src={currentImage}
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
                  fontWeight: 600,
                  fontFamily: poppins.style.fontFamily,
                  mb: { xs: 1, md: 1 },
                }}
              >
                {product.category} {product.sub_category ? `| ${product.sub_category}` : ""}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "14px", md: "18px" },
                  color: "#527F65",
                  fontWeight: 500,
                  fontFamily: poppins.style.fontFamily,
                  mb: { xs: 2, md: 3 },
                }}
              >
                Material : {product.features?.material || "Not Mentioned"}
              </Typography>
              {product.pdf && (
                <Box
                  onClick={handleOpenPdf}
                  sx={{
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    color: "#ffffff",
                    background: "linear-gradient(to right, #8DC38B, #527F65)",
                    textDecoration: "none",
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    border: "1px solid",

                    borderRadius: "30px",
                    padding: "10px",
                    "&:hover": {
                      color: "#629474",
                      background: "linear-gradient(to right, #ffffffff, #ffffffff)",
                    },
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: "18px" }} />
                  <span>See more on Product</span>
                </Box>
              )}

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
                justifyContent={{ xs: "center", sm: "space-between" }}
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


              {product.options && product.options.length > 1 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: poppins.style.fontFamily,
                      mb: 1.5,
                    }}
                  >
                    Select Size
                  </Typography>
                  <Stack direction="row" spacing={0} sx={{ flexWrap: "wrap", gap: 2, justifyContent: "flex-start", mb: 2 }}>
                    {product.options.map((option, index) => (
                      <Box
                        key={index}
                        onClick={() => setSelectedSize(option)}
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: "100px",
                          border: "1px solid",
                          borderColor: selectedSize.size === option.size ? "#629474" : "#e0e0e0",
                          backgroundColor: selectedSize.size === option.size ? "#f0faf3" : "transparent",
                          color: selectedSize.size === option.size ? "#629474" : "#000",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontFamily: poppins.style.fontFamily,
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "#629474",
                            backgroundColor: "#f0faf3",
                          },
                        }}
                      >
                        {option.size}
                      </Box>
                    ))}
                  </Stack>
                  {selectedSize.special_notes && (
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#d32f2f",
                        fontWeight: 500,
                        fontFamily: poppins.style.fontFamily,
                        fontStyle: "italic",
                        mt: 1
                      }}
                    >
                      * {selectedSize.special_notes}
                    </Typography>
                  )}
                </Box>
              )}

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
                        {selectedSize.regularPrice} LKR
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
                        {selectedSize.wholeSalePrice} LKR
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

      <Modal
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, md: 4 },
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px",
            height: "90vh",
            backgroundColor: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: 24,
            outline: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                fontFamily: poppins.style.fontFamily,
              }}
            >
              {product.title}
            </Typography>
            <IconButton onClick={() => setPdfOpen(false)} sx={{ color: "#7a7a7a" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {isLoadingPdf ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <CircularProgress sx={{ color: "#629474" }} />
              </Box>
            ) : pdfError ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f9f9f9",
                  p: 4,
                  textAlign: "center"
                }}
              >
                <ErrorOutlineIcon sx={{ fontSize: "64px", color: "#d32f2f", mb: 2 }} />
                <Typography
                  sx={{
                    fontSize: { xs: "24px", md: "32px" },
                    fontWeight: 600,
                    fontFamily: poppins.style.fontFamily,
                    color: "#000",
                    mb: 1
                  }}
                >
                  Oops! Document Not Found
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#7a7a7a",
                    fontFamily: poppins.style.fontFamily,
                    maxWidth: "500px"
                  }}
                >
                  We couldn't locate the PDF for this product. It might have been removed or temporarily unavailable. Please check back later.
                </Typography>
              </Box>
            ) : (
              <iframe
                src={product.pdf}
                width="100%"
                height="100%"
                style={{ border: "none", display: "block" }}
                title={`${product.title} PDF`}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
