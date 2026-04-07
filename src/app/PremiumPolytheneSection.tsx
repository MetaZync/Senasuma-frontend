"use client";

import React from "react";
import { Box, Typography, Container, Chip } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import OrderButton from "@/components/Button";
import CallIcon from '@mui/icons-material/Call';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const PremiumPolytheneSection: React.FC = () => {
  const galleryItems = [
    { id: 1, image: "/Assets/HomeGallery1.webp", gridArea: "1 / 1 / 3 / 2" },
    { id: 2, image: "/Assets/HomeGallery2.webp", gridArea: "1 / 2 / 3 / 3" },
    { id: 3, image: "/Assets/HomeGallery3.webp", gridArea: "1 / 3 / 2 / 4" },
    { id: 4, image: "/Assets/HomeGallery8.webp", gridArea: "1 / 5 / 3 / 6" },
    { id: 5, image: "/Assets/HomeGallery5.webp", gridArea: "3 / 1 / 4 / 3" },
    { id: 6, image: "/Assets/HomeGallery6.webp", gridArea: "3 / 3 / 4 / 4" },
    { id: 7, image: "/Assets/HomeGallery7.webp", gridArea: "2 / 4 / 4 / 5" },
    { id: 8, image: "/Assets/HomeGallery9.webp", gridArea: "3 / 5 / 4 / 6" },
    { id: 9, image: "/Assets/HomeGallery4.webp", gridArea: "2 / 3 / 3 / 4" },
  ];

  const chips = [
    "Industry-ready performance",
    "durability & finish",
    "customizable options",
    "Reliable bulk supply",
    "Eco-friendly",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        py: { xs: 15, md: 12 },
        px: { xs: 2, md: 4, lg: 8 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 4,
            mb: { xs: 6, md: 10 },
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
              fontWeight: 500,
              color: "#1a1a1a",
              lineHeight: 1.1,
              maxWidth: "800px",
            }}
          >
            Premium Polythene for Every Industry
          </Typography>

          <Box sx={{ maxWidth: "520px", display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: { xs: "13px", md: "16px" },
                color: "#000000",
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              Senasuma delivers premium-grade polythene products engineered to support every major industry—retail, agriculture, construction, manufacturing, exports, and more. Built with precision and sustainability, our solutions offer the perfect balance of strength, flexibility, and eco-responsibility.
            </Typography>
            <Box>
              <OrderButton 
                onClick={() => {}}
                icon={<CallIcon sx={{ fontSize: "18px" }} />}
              >
                Contact Now
              </OrderButton>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gridAutoRows: {
              xs: "150px",
              md: "200px",
            },
            gap: { xs: 1, md: 0.5 },
            width: "100%",
          }}
        >
          {galleryItems.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                display: item.image.includes("HomeGallery9.webp")
                  ? { xs: "none", md: "block" }
                  : "block",
                gridArea: { md: item.gridArea },
                gridColumn: { 
                  xs: index === 0 || index === 4 ? "span 1" : "span 1",
                  md: undefined 
                },
                gridRow: {
                  xs: index === 1 || index === 3 ? "span 2" : "span 1",
                  md: undefined
                },
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "transform 0.4s ease",
                "&:hover": {
                  transform: "scale(1.01)",
                  zIndex: 10,
                },
              }}
            >
              <Image
                src={item.image}
                alt={`Industry ${item.id}`}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ))}

          <Box
            sx={{
              gridArea: { md: "1 / 4 / 2 / 5" },
              gridColumn: { xs: "1 / -1", md: "4 / 5" },
              order: { xs: -1, md: 0 },
              height: "auto",
              minHeight: { xs: "150px", md: "200px" },
              background: "linear-gradient(135deg, #629474 0%, #4a7a5c 100%)",
              borderRadius: "24px",
              p: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              mb: { xs: 2.5, md: 0 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "#fff",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#629474",
              }}
            >
              <ArrowOutwardIcon />
            </Box>

            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: { xs: "18px", md: "20px" },
                fontWeight: 500,
                color: "#fff",
                mb: 1.5,
                pr: 4,
              }}
            >
              Why Businesses Choose Us
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {chips.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "11px",
                    height: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    "& .MuiChip-label": { px: 0.5 },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PremiumPolytheneSection;
