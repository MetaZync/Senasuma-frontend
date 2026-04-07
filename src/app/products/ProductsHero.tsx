"use client";

import { Box, Typography } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function ProductsHero() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "40vh", 
        background: "linear-gradient(to right, #8DC38B, #527F65)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pt: 10,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/Assets/HomeBackground.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          opacity: 1,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            px: { xs: 2.5, md: 3 },
            py: { xs: 0.8, md: 1 },
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", md: "14px" },
              fontFamily: poppins.style.fontFamily,
              letterSpacing: "1.5px",
              fontWeight: 300,
              textTransform: "uppercase",
              m: 0,
            }}
          >
            Eco-Friendly
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontWeight: 500,
            fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem" },
            lineHeight: 1.1,
            fontFamily: poppins.style.fontFamily,
            letterSpacing: "-1px",
            textShadow: "0px 8px 32px rgba(0,0,0,0.15)",
            m: 0,
          }}
        >
          Products
        </Typography>
      </Box>
    </Box>
  );
}
