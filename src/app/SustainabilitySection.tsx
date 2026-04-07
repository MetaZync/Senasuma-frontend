"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { Poppins } from "next/font/google";
import OrderButton from "../components/Button";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SustainabilitySection: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 15 },
        px: { xs: 3, md: 5 },
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/Assets/GreenRoundLogo.webp"
            alt="Sustainability"
            width={120}
            height={120}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: {xs: "12px", sm: "14px", md: "16px", lg: "18px"},
            fontWeight: 500,
            color: "#333",
            mb: 4,
            textTransform: "capitalize",
          }}
        >
          Sustainability
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2.2rem", lg: "2.5rem" },
            fontWeight: 400,
            lineHeight: 1.4,
            color: "#1a1a1a",
            mb: 6,
            maxWidth: "900px",
            mx: "auto",
          }}
        >
          Eco-efficient facilities of Senasuma Polythene strict quality benchmarks, and long-term partnerships allow us to create packaging that is durable, ethical, and aligned with global sustainability standards.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <OrderButton href="/products">
            Explore Products
          </OrderButton>
        </Box>
      </Container>
    </Box>
  );
};

export default SustainabilitySection;
