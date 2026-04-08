"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { Poppins } from "next/font/google";
import OrderButton from "@/components/Button";
import FadeIn from "@/components/FadeIn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BuildSolutionsSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: {xs: "40vh", md: "70vh"},
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <FadeIn delay={0.1}>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "28px", md: "42px", lg: "48px" },
              fontWeight: 500,
              color: "#000",
              lineHeight: 1.2,
              mb: 4,
              maxWidth: "1100px",
              mx: "auto",
            }}
          >
            Let’s build solutions that elevate your brand while protecting the environment.
          </Typography>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
          <OrderButton
            onClick={() => {}}
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 2C3.66667 2 3.4 2.13333 3.2 2.4L2.33333 3.46667C2.13333 3.73333 2 4 2 4.33333V12.6667C2 13.4 2.6 14 3.33333 14H8.86667C8.73333 13.6 8.66667 13.1333 8.66667 12.6667C8.66667 10.4667 10.4667 8.66667 12.6667 8.66667C13.1333 8.66667 13.6 8.73333 14 8.86667V4.33333C14 4 13.8667 3.73333 13.6667 3.46667L12.7333 2.33333C12.6 2.13333 12.3333 2 12 2H4ZM3.93333 2.66667H11.9333L12.5333 3.33333H3.4L3.93333 2.66667ZM4 10H8V12H4V10ZM14.2 10.5333L11.8 12.9333L10.7333 11.8667L10 12.6667L11.8667 14.6667L15.0667 11.4667L14.2 10.5333Z" fill="black" />
              </svg>
            }
          >
            Order Now
          </OrderButton>
        </Box>
        </FadeIn>
      </Container>
    </Box>
  );
};

export default BuildSolutionsSection;
