"use client";

import { Box, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import FadeIn from "@/components/FadeIn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AboutStatement() {
  return (
    <Box component={FadeIn} delay={0.1}
      sx={{
        width: "100%",
        py: { xs: 10, sm: 14, md: 10 },
        px: { xs: 3, sm: 6, md: 12, lg: 18, xl: 24 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 500,
          fontSize: { xs: "28px", sm: "36px", md: "48px", lg: "60px", xl: "72px" },
          lineHeight: 1.25,
          letterSpacing: { xs: "-0.5px", md: "-1px", lg: "-2px" },
          color: "#0a0a0a",
          textAlign: "center",
          maxWidth: "1200px",
        }}
      >
        Every decision prioritizes people and planet, from fair wages to{" "}
        <Box
          component="span"
          sx={{
            background: "linear-gradient(to right, #8DC38B, #527F65)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          zero-waste
        </Box>{" "}
        operations.
      </Typography>
    </Box>
  );
}
